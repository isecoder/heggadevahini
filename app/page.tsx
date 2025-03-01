// import { Search, Menu, Bell } from "lucide-react"
// import Image from "next/image"
// import Link from "next/link"
// import { ChevronLeft, ChevronRight, Play } from "lucide-react"

// export default function Page() {
//   return (
//     <div className="min-h-screen bg-white">
//       {/* Top Header */}
//       <header className="border-b">
//         <div className="container mx-auto px-4">
//           <div className="flex items-center justify-between h-16">
//             {/* Logo */}
//             <Link href="/" className="flex items-center">
//               <Image
//                 src="/placeholder.svg?height=40&width=120"
//                 alt="Logo"
//                 width={120}
//                 height={40}
//                 className="h-10 w-auto"
//               />
//             </Link>

//             {/* Main Navigation */}
//             <nav className="hidden md:flex items-center space-x-8">
//               <Link href="/about" className="text-gray-700 hover:text-[#F48634]">
//                 About
//               </Link>
//               <Link href="/e-paper" className="text-gray-700 hover:text-[#F48634]">
//                 E-Paper
//               </Link>
//               <Link href="/latest" className="text-gray-700 hover:text-[#F48634]">
//                 Latest News
//               </Link>
//               <Link href="/videos" className="text-gray-700 hover:text-[#F48634]">
//                 Videos
//               </Link>
//               <Link href="/subscribe" className="text-gray-700 hover:text-[#F48634]">
//                 Subscribe
//               </Link>
//             </nav>

//             {/* Right Section */}
//             <div className="flex items-center space-x-4">
//               <Bell className="h-5 w-5 text-gray-600" />
//               <button className="bg-[#F48634] text-white px-4 py-2 rounded-md hover:bg-[#F48634]/90">Login</button>
//               <Menu className="h-6 w-6 md:hidden" />
//             </div>
//           </div>
//         </div>

//         {/* Timestamp Section */}
//         <div className="border-t border-gray-100">
//           <div className="container mx-auto px-4">
//             <div className="flex justify-center py-2 text-sm text-gray-600">
//               Wednesday, 12 Feb 2025 | UPDATED:01:13 PM IST
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Category Navigation */}
//       <nav className="bg-gray-50 border-b">
//         <div className="container mx-auto px-4">
//           <div className="flex items-center space-x-6 overflow-x-auto py-3 no-scrollbar">
//             {["Business", "Entertainment", "Sports", "Health", "Style", "Tech", "Weather", "Travel"].map((category) => (
//               <Link
//                 key={category}
//                 href={`/${category.toLowerCase()}`}
//                 className="text-gray-600 hover:text-[#F48634] whitespace-nowrap"
//               >
//                 {category}
//               </Link>
//             ))}
//             <button className="ml-auto bg-[#F48634] text-white px-4 py-1 rounded-md">Kannada</button>
//           </div>
//         </div>
//       </nav>

//       {/* Main Content */}
//       <main className="container mx-auto px-4 py-8">
//         {/* Welcome Banner */}
//         <div className="text-center mb-8">
//           <h1 className="inline-block text-3xl md:text-4xl font-bold bg-[#F48634] text-white px-6 py-3 border-2 border-black rounded-lg">
//             WELCOME TO HEGGADE VAHINI 🙏
//           </h1>
//         </div>

//         {/* Search Bar */}
//         <div className="max-w-2xl mx-auto mb-12">
//           <div className="relative">
//             <input
//               type="text"
//               placeholder="Search for news"
//               className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-200 focus:outline-none focus:border-[#F48634]"
//             />
//             <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
//           </div>
//         </div>

//         {/* News Grid */}
//         <div className="grid lg:grid-cols-2 gap-8">
//           {/* Latest News Carousel */}
//           <section className="bg-[#FFF3E9] p-4 rounded-lg">
//             <div className="relative group">
//               {/* Image and Controls */}
//               <div className="relative h-[400px] mb-4">
//                 <Image
//                   src="/placeholder.svg?height=400&width=600"
//                   alt="News thumbnail"
//                   fill
//                   className="rounded-lg object-cover"
//                 />
//                 <button className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center hover:bg-white">
//                   <ChevronLeft className="h-6 w-6" />
//                 </button>
//                 <button className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center hover:bg-white">
//                   <ChevronRight className="h-6 w-6" />
//                 </button>
//                 <button className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white/80 rounded-full flex items-center justify-center hover:bg-white">
//                   <Play className="h-8 w-8 ml-1" />
//                 </button>
//                 <div className="absolute top-4 right-4 bg-white/80 px-2 py-1 rounded text-sm">25 mins read</div>
//               </div>

//               {/* Content */}
//               <h2 className="text-2xl font-bold mb-2">
//                 Protest against war crimes erupts in Italy as thousands gather near Bell Tower
//               </h2>
//               <p className="text-gray-600">
//                 Italy has called on the European Union to impose ad hoc sanctions against Hamas and its supporters, the
//                 foreign ministers of the three nations wrote in a joint letter to the EU's foreign policy chief Josep
//                 Borrell. Follow our live blog fo...
//               </p>
//             </div>
//           </section>

//           {/* Trending News */}
//           <section className="space-y-4">
//             <h2 className="text-xl font-semibold flex justify-between items-center">
//               Trending
//               <Link href="/trending" className="text-[#F48634] text-sm">
//                 View all →
//               </Link>
//             </h2>
//             <div className="space-y-4">
//               {[
//                 {
//                   title: "Jamia revokes suspension of professor accused of sexual harassment",
//                   image: "/placeholder.svg?height=80&width=80",
//                 },
//                 {
//                   title:
//                     "Australian man charged with several offences over fatal crash that killed 3 Indian-origin families",
//                   image: "/placeholder.svg?height=80&width=80",
//                 },
//                 {
//                   title: "Tibetans in exile accuse China of destroying their identity in Tibet under its rule",
//                   image: "/placeholder.svg?height=80&width=80",
//                 },
//                 {
//                   title: "U.S. calls on Beijing to stop 'dangerous' conduct in South China Sea",
//                   image: "/placeholder.svg?height=80&width=80",
//                 },
//                 {
//                   title: "U.S. F-16 jet crashes in South Korea, pilot rescued after ejecting",
//                   image: "/placeholder.svg?height=80&width=80",
//                 },
//               ].map((item, i) => (
//                 <article key={i} className="flex gap-4 group">
//                   <div className="relative h-20 w-20 flex-shrink-0">
//                     <Image
//                       src={item.image || "/placeholder.svg"}
//                       alt="News thumbnail"
//                       fill
//                       className="rounded-lg object-cover"
//                     />
//                   </div>
//                   <div>
//                     <h3 className="font-bold text-[110%] group-hover:text-[#F48634]">{item.title}</h3>
//                   </div>
//                 </article>
//               ))}
//             </div>
//           </section>
//         </div>

//         {/* Politics Section */}
//         <section className="mt-8">
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="text-xl font-semibold flex items-center gap-2">
//               <span className="p-1 bg-blue-100 rounded">📰</span> Politics
//             </h2>
//             <Link href="/politics" className="text-[#F48634]">
//               View all →
//             </Link>
//           </div>
//           <div className="grid grid-flow-col auto-cols-[280px] gap-4 overflow-x-auto pb-4 no-scrollbar">
//             {[1, 2, 3, 4, 5, 6].map((i) => (
//               <article key={i} className="group">
//                 <div className="relative h-48 mb-3">
//                   <Image
//                     src={`/placeholder.svg?height=200&width=280`}
//                     alt="News thumbnail"
//                     fill
//                     className="rounded-lg object-cover"
//                   />
//                 </div>
//                 <h3 className="font-bold text-[110%] group-hover:text-[#F48634] line-clamp-2">
//                   Egypt says problem is genocide in Gaza, not a big farm as the world's eyes are fixed on Gaza
//                 </h3>
//               </article>
//             ))}
//           </div>
//         </section>
//       </main>
//     </div>
//   )
// }


// import Header from "@/components/header/header"
// import CategoryNav from "@/components/category_nav/c_nav"
import SearchBar from "@/components/homepage/search_bar";
import Latest from "@/components/homepage/latest";
import Trending from "@/components/homepage/trending";
// import Politics from "@/components/homepage/politics";
import WelcomeBanner from "@/components/homepage/welcome-banner";
// import Wild_sp_comp from "@/components/homepage/wild_sports_comb/wild_sp_comp";
// import Heri_ent_comp from "@/components/homepage/ha_ent_comb/heritage_ent_comb";

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

