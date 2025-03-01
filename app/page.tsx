import SearchBar from "@/components/homepage/search_bar";
  import Latest from "@/components/homepage/latest";
  import Trending from "@/components/homepage/trending";
  import { Newspaper } from "lucide-react";
  // import Politics from "@/components/homepage/politics";
  import WelcomeBanner from "@/components/homepage/welcome-banner";
  // import Wild_sp_comp from "@/components/homepage/wild_sports_comb/wild_sp_comp";
  // import Heri_ent_comp from "@/components/homepage/ha_ent_comb/heritage_ent_comb";
  import Link from "next/link";
  const HomePage = () => {
    return ( 
      <div className="min-h-screen bg-white">
        
        <main className="container  mx-auto px-0 sm:px-4 md:px-6 lg:px-8 py-6 md:py-8 lg:py-12 ">
        {/* max-w-7xl */}
         
          

        <Link href="/e-paper" className="block">
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-6 px-4 sm:py-10 sm:px-6 text-center mb-6 cursor-pointer">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-center items-center mb-2">
            <Newspaper className="h-8 w-8 mb-2 sm:mb-0 sm:mr-2" />
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">Our E-Paper</h1>
          </div>
          <p className="text-orange-100 max-w-2xl mx-auto text-sm sm:text-base">
            ಪ್ರೇರಣಾ ಹೆಗ್ಗಡೆ ವಾಹಿನಿ ತಿಂಗಳ ಪತ್ರಿಕೆ ಓದಿದ್ದೀರಾ? ಇ-ಪೇಪರ್ ಓದಲು ಇಲ್ಲಿ ಕ್ಲಿಕ್ ಮಾಡಿ
          </p>
        </div>
      </div>
    </Link>
  <WelcomeBanner />
          <SearchBar />

          {/* Latest & Trending */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-6">
            <Latest />
            <Trending />
          </div>

          {/* Other Sections */}
          {/* <div className="space-y-8 md:space-y-12 mt-8">
            <Politics />
            <Wild_sp_comp />
            <Heri_ent_comp />
          </div> */}
        </main>
      </div>
    );
  };

  export default HomePage;

