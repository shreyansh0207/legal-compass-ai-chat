
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Phone, Upload, FileText } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const LawyerProfile = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    phone: '',
    specialization: '',
    licenseId: '',
    experience: '',
    bio: '',
  });
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [existingProfile, setExistingProfile] = useState<any>(null);
  
  // Check if user is logged in and is a lawyer
  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/auth');
      return;
    }
    
    if (!isLoading && user && user.role !== 'Lawyer') {
      toast.error('Only lawyers can access this page');
      navigate('/');
      return;
    }
    
    // Fetch existing profile if any
    if (user) {
      fetchProfile();
    }
  }, [user, isLoading, navigate]);
  
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`/api/lawyer-profile/${user?._id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setExistingProfile(data);
        setProfile({
          phone: data.phone || '',
          specialization: data.specialization || '',
          licenseId: data.licenseId || '',
          experience: data.experience?.toString() || '',
          bio: data.bio || '',
        });
        
        if (data.profileImage) {
          setImagePreview(data.profileImage);
        }
      }
    } catch (error) {
      console.error('Failed to fetch profile:', error);
    }
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileImage(file);
      
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!profile.phone || !profile.specialization || !profile.licenseId || !profile.experience || !profile.bio) {
      toast.error('All fields are required');
      return;
    }
    
    try {
      setLoading(true);
      
      const token = localStorage.getItem('authToken');
      const formData = new FormData();
      
      formData.append('phone', profile.phone);
      formData.append('specialization', profile.specialization);
      formData.append('licenseId', profile.licenseId);
      formData.append('experience', profile.experience);
      formData.append('bio', profile.bio);
      
      if (profileImage) {
        formData.append('profileImage', profileImage);
      }
      
      const response = await fetch('/api/lawyer-profile', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update profile');
      }
      
      toast.success('Profile updated successfully');
      navigate('/lawyers');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };
  
  if (isLoading) {
    return <div className="container mx-auto py-8 text-center">Loading...</div>;
  }
  
  return (
    <div className="container mx-auto py-8">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Lawyer Profile</CardTitle>
          <CardDescription>
            Complete your profile to start connecting with clients
          </CardDescription>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="w-32 h-32">
                {imagePreview ? (
                  <AvatarImage src={imagePreview} alt="Profile" />
                ) : (
                  <AvatarFallback>{user?.name?.charAt(0) || '?'}</AvatarFallback>
                )}
              </Avatar>
              
              <div className="flex items-center space-x-2">
                <Label htmlFor="profileImage" className="cursor-pointer px-4 py-2 bg-secondary text-secondary-foreground rounded-md flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  Upload Photo
                </Label>
                <Input
                  id="profileImage"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" type="text" value={user?.name || ''} disabled />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={user?.email || ''} disabled />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Your phone number"
                    className="pl-10"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="specialization">Specialization</Label>
                <Input
                  id="specialization"
                  type="text"
                  placeholder="e.g. Family Law, Criminal Law"
                  value={profile.specialization}
                  onChange={(e) => setProfile({ ...profile, specialization: e.target.value })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="licenseId">License ID</Label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="licenseId"
                    type="text"
                    placeholder="Your professional license ID"
                    className="pl-10"
                    value={profile.licenseId}
                    onChange={(e) => setProfile({ ...profile, licenseId: e.target.value })}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="experience">Experience (Years)</Label>
                <Input
                  id="experience"
                  type="number"
                  min="0"
                  placeholder="Years of experience"
                  value={profile.experience}
                  onChange={(e) => setProfile({ ...profile, experience: e.target.value })}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bio">Bio/About</Label>
              <Textarea
                id="bio"
                placeholder="Tell potential clients about your background, expertise, and approach"
                rows={5}
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              />
            </div>
          </CardContent>
          
          <CardFooter>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Saving...' : (existingProfile ? 'Update Profile' : 'Create Profile')}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default LawyerProfile;
