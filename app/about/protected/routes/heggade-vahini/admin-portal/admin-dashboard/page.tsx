const AdminDashboard = () => {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Welcome to the Admin Dashboard</h1>
        <div className="bg-white shadow-md p-6 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Upload News</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input type="text" className="w-full border p-2 rounded-lg" placeholder="Enter news title" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea className="w-full border p-2 rounded-lg" placeholder="Enter news description"></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Image URL</label>
              <input type="text" className="w-full border p-2 rounded-lg" placeholder="Enter image URL" />
            </div>
            <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  };
  
  export default AdminDashboard;
  