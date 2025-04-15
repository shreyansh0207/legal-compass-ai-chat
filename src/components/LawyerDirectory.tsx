
import { useState } from "react";
import { Search, Filter, ChevronsUpDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import LawyerCard from "./LawyerCard";

const LAWYERS = [
  {
    id: "1",
    name: "Sarah Johnson",
    specialization: "Education Law Specialist",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    rating: 4.8,
    experience: 12,
    availability: "Available Now",
    contactInfo: {
      phone: "+1 (555) 123-4567",
      email: "sarah.johnson@legalcompass.com",
      availability: "Mon-Fri, 9am-5pm EST"
    }
  },
  {
    id: "2",
    name: "Michael Chen",
    specialization: "Sports Law Expert",
    image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    rating: 4.9,
    experience: 15,
    availability: "Available in 1 hour",
    contactInfo: null
  },
  {
    id: "3",
    name: "Jessica Rodriguez",
    specialization: "Finance & Securities Law",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    rating: 4.7,
    experience: 10,
    availability: "Available Tomorrow",
    contactInfo: null
  },
  {
    id: "4",
    name: "David Thompson",
    specialization: "Real Estate & Property Law",
    image: "https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    rating: 4.6,
    experience: 8,
    availability: "Busy until Friday",
    contactInfo: null
  },
];

const LawyerDirectory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [sortBy, setSortBy] = useState("rating");
  const [availabilityFilter, setAvailabilityFilter] = useState("all");

  const filteredLawyers = LAWYERS.filter(lawyer => {
    const matchesSearch = lawyer.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          lawyer.specialization.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSpecialization = specialization === "" || 
                                 lawyer.specialization.toLowerCase().includes(specialization.toLowerCase());
    
    const matchesAvailability = availabilityFilter === "all" || 
                              (availabilityFilter === "available" && lawyer.availability.toLowerCase().includes("available"));
    
    return matchesSearch && matchesSpecialization && matchesAvailability;
  }).sort((a, b) => {
    if (sortBy === "rating") {
      return b.rating - a.rating;
    } else if (sortBy === "experience") {
      return b.experience - a.experience;
    }
    return 0;
  });

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <h2 className="text-2xl font-semibold mb-4">Find Qualified Lawyers</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search by name or specialization..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Select value={specialization} onValueChange={setSpecialization}>
            <SelectTrigger>
              <SelectValue placeholder="All Specializations" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Specializations</SelectItem>
              <SelectItem value="education">Education Law</SelectItem>
              <SelectItem value="sports">Sports Law</SelectItem>
              <SelectItem value="finance">Finance Law</SelectItem>
              <SelectItem value="real estate">Real Estate Law</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger>
              <div className="flex items-center">
                <ChevronsUpDown className="mr-2 h-4 w-4" />
                <span>Sort By: {sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}</span>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating">Highest Rating</SelectItem>
              <SelectItem value="experience">Most Experience</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Availability" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Lawyers</SelectItem>
              <SelectItem value="available">Available Now</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="sm" className="flex items-center">
            <Filter className="mr-2 h-4 w-4" />
            More Filters
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLawyers.length > 0 ? (
          filteredLawyers.map(lawyer => (
            <LawyerCard key={lawyer.id} {...lawyer} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-lg text-muted-foreground">No lawyers found matching your criteria.</p>
            <Button variant="link" onClick={() => {
              setSearchQuery("");
              setSpecialization("");
              setAvailabilityFilter("all");
            }}>
              Clear all filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LawyerDirectory;
