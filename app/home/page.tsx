import SearchBar from "@/components/homepage/search_bar";
import Latest from "@/components/homepage/latest";
import Trending from "@/components/homepage/trending";
import Politics from "@/components/homepage/politics";
import WelcomeBanner from "@/components/homepage/welcome-banner";
import Wild_sp_comp from "@/components/homepage/wild_sports_comb/wild_sp_comp";
import Heri_ent_comp from "@/components/homepage/ha_ent_comb/heritage_ent_comb";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      
      <main className="container  mx-auto px-0 sm:px-4 md:px-6 lg:px-8 py-6 md:py-8 lg:py-12">
      {/* max-w-7xl */}
        <WelcomeBanner />
        <SearchBar />

        {/* Latest & Trending */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-6">
          <Latest />
          <Trending />
        </div>

        {/* Other Sections */}
        <div className="space-y-8 md:space-y-12 mt-8">
          <Politics />
          <Wild_sp_comp />
          <Heri_ent_comp />
        </div>
      </main>
    </div>
  );
};

export default HomePage;

