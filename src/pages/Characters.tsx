import { useState } from "react";
import { PromoBar } from "../components/PromoBar";
import { Sidebar } from "../components/Sidebar";
import Header from "../components/Header";
import { Search, Star, Heart, Download, Play, MoreHorizontal } from "lucide-react";

interface Character {
  id: string;
  name: string;
  category: string;
  creator: string;
  image: string;
  rating: number;
  likes: number;
  downloads: number;
  isNew?: boolean;
  isPremium?: boolean;
}

const mockCharacters: Character[] = [
  {
    id: "1",
    name: "Ethereal Warrior",
    category: "Fantasy",
    creator: "ArtMaster",
    image: "/lovable-uploads/22f4141e-f83e-4b85-8c93-672e181d999b.png",
    rating: 4.9,
    likes: 2451,
    downloads: 8234,
    isNew: true,
  },
  {
    id: "2",
    name: "Cyber Ninja",
    category: "Sci-Fi",
    creator: "FutureVision",
    image: "/lovable-uploads/e9db2be9-f0a3-4506-b387-ce20bea67ba9.png",
    rating: 4.8,
    likes: 3142,
    downloads: 12056,
    isPremium: true,
  },
  {
    id: "3",
    name: "Medieval Knight",
    category: "Historical",
    creator: "TimeTraveler",
    image: "/lovable-uploads/e565a3ea-dc96-4344-a533-62026d4245e1.png",
    rating: 4.7,
    likes: 1876,
    downloads: 6543,
  },
  {
    id: "4",
    name: "Space Explorer",
    category: "Sci-Fi",
    creator: "CosmicArt",
    image: "/lovable-uploads/12cd0679-f352-498e-a6ad-9faaa1ffbec9.png",
    rating: 4.8,
    likes: 2987,
    downloads: 9871,
    isNew: true,
  },
  {
    id: "5",
    name: "Forest Guardian",
    category: "Nature",
    creator: "EcoDesigns",
    image: "/lovable-uploads/d16f3783-6af1-4327-8936-c5a50eb0cab5.png",
    rating: 4.6,
    likes: 1654,
    downloads: 5432,
  },
  {
    id: "6",
    name: "Urban Detective",
    category: "Modern",
    creator: "CityLife",
    image: "/lovable-uploads/142dea30-a410-4e79-84d0-70189e8fcd07.png",
    rating: 4.9,
    likes: 3654,
    downloads: 11234,
    isPremium: true,
  },
];

const categories = ["All", "Fantasy", "Sci-Fi", "Historical", "Nature", "Modern"];

const CharacterCard = ({ character }: { character: Character }) => (
  <div className="bg-card rounded-lg overflow-hidden hover:bg-card/80 transition-colors group">
    <div className="relative">
      <img 
        src={character.image} 
        alt={character.name}
        className="w-full h-48 object-cover"
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
        <button className="bg-primary text-primary-foreground p-3 rounded-full hover:bg-primary/90 transition-colors">
          <Play size={20} fill="currentColor" />
        </button>
      </div>
      {character.isNew && (
        <span className="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded-full font-bold">
          NEW
        </span>
      )}
      {character.isPremium && (
        <span className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full font-bold">
          PRO
        </span>
      )}
    </div>
    
    <div className="p-4">
      <div className="flex items-start justify-between mb-2">
        <div>
          <h3 className="font-semibold text-foreground text-sm">{character.name}</h3>
          <p className="text-muted-foreground text-xs">{character.creator}</p>
        </div>
        <button className="text-muted-foreground hover:text-foreground transition-colors">
          <MoreHorizontal size={16} />
        </button>
      </div>
      
      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <Star size={12} className="text-yellow-500 fill-current" />
          <span>{character.rating}</span>
        </div>
        <div className="flex items-center gap-1">
          <Heart size={12} />
          <span>{character.likes.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-1">
          <Download size={12} />
          <span>{character.downloads.toLocaleString()}</span>
        </div>
      </div>
      
      <div className="mt-3 flex items-center justify-between">
        <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">
          {character.category}
        </span>
        <button className="text-xs text-primary hover:text-primary/80 transition-colors font-medium">
          Use Character
        </button>
      </div>
    </div>
  </div>
);

const Characters = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCharacters = mockCharacters.filter(character => {
    const matchesCategory = selectedCategory === "All" || character.category === selectedCategory;
    const matchesSearch = character.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         character.creator.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <PromoBar />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <div className="flex-1 overflow-auto">
            <main className="py-8 px-12">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-2">
                    Best Characters
                  </h1>
                  <p className="text-muted-foreground">
                    Discover amazing AI characters created by our community
                  </p>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search characters..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="bg-input border border-border rounded-lg pl-10 pr-4 py-2 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                </div>
              </div>

              {/* Category Filter */}
              <div className="flex gap-2 mb-8 overflow-x-auto">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                      selectedCategory === category
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Featured Section */}
              <section className="mb-12">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-foreground">
                    Featured Characters
                  </h2>
                  <button className="text-sm text-primary hover:text-primary/80 transition-colors font-medium">
                    View All
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {filteredCharacters.slice(0, 4).map((character) => (
                    <CharacterCard key={character.id} character={character} />
                  ))}
                </div>
              </section>

              {/* All Characters */}
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-foreground">
                    All Characters
                  </h2>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{filteredCharacters.length} characters</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredCharacters.map((character) => (
                    <CharacterCard key={character.id} character={character} />
                  ))}
                </div>
              </section>

              {filteredCharacters.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">
                    No characters found matching your criteria.
                  </p>
                  <button 
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedCategory("All");
                    }}
                    className="mt-4 text-primary hover:text-primary/80 transition-colors font-medium"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Characters;