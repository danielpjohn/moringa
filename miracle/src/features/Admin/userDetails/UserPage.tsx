import Sidebar from "../sidebar/sidebar";

export default function UserPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Full-height Sidebar - Mobile responsive by default */}
      <div className="fixed inset-y-0 left-0 h-full z-30">
        <Sidebar onClose={() => {}} onNavClick={() => {}} isMobile={false} />
      </div>

      {/* Main Content with mobile margin top */}
      <div className="flex-1 ml-0 lg:ml-64 mt-16 lg:mt-0">
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] lg:min-h-screen p-4 sm:p-6 lg:p-8">
          <div className="w-full max-w-6xl">
            {/* User Management Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">User Management</h2>
                <button className="w-full sm:w-auto bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 rounded-lg shadow hover:from-green-700 hover:to-emerald-700 transition-all text-sm sm:text-base">
                  Add New User
                </button>
              </div>

              {/* Search and Filter - Stacked on mobile */}
              <div className="flex flex-col md:flex-row gap-3 mb-6">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Search users..."
                    className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-100 focus:border-green-500 transition-all"
                  />
                </div>
                <div className="flex gap-2">
                  <select className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-100 focus:border-green-500 transition-all">
                    <option>Filter</option>
                    <option>Admin</option>
                    <option>User</option>
                  </select>
                  <select className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-100 focus:border-green-500 transition-all">
                    <option>Sort</option>
                    <option>A-Z</option>
                    <option>Z-A</option>
                  </select>
                </div>
              </div>

              {/* Responsive Table */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Role
                      </th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {[1, 2, 3, 4, 5].map((user) => (
                      <tr key={user} className="hover:bg-gray-50">
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gradient-to-r from-green-100 to-emerald-100 flex items-center justify-center">
                              <span className="text-xs sm:text-sm text-green-600 font-medium">U{user}</span>
                            </div>
                            <div className="ml-2 sm:ml-4">
                              <div className="text-xs sm:text-sm font-medium text-gray-900">User {user}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                          user{user}@example.com
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                            {user === 1 ? 'Admin' : 'User'}
                          </span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs rounded-full bg-emerald-100 text-emerald-800">
                            Active
                          </span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-right text-xs sm:text-sm font-medium space-x-2">
                          <button className="text-green-600 hover:text-green-800">Edit</button>
                          <button className="text-red-600 hover:text-red-800">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination - Simplified for mobile */}
              <div className="mt-6 flex items-center justify-between">
                <div className="hidden sm:block">
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of{' '}
                    <span className="font-medium">12</span> results
                  </p>
                </div>
                <div className="flex-1 sm:flex-none">
                  <nav className="flex justify-center sm:justify-end">
                    <button className="px-3 py-1 rounded-l border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                      Previous
                    </button>
                    <button className="px-3 py-1 border-t border-b border-gray-300 bg-white text-sm font-medium text-green-600 hover:bg-gray-50">
                      1
                    </button>
                    <button className="px-3 py-1 border-t border-b border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                      2
                    </button>
                    <button className="px-3 py-1 border-t border-b border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                      3
                    </button>
                    <button className="px-3 py-1 rounded-r border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                      Next
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}