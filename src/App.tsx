import React, { useState, useMemo } from 'react';
import { Search, Download, MapPin, Phone, Mail, Building, Filter, AlertTriangle } from 'lucide-react';

// Mock data for demonstration
const mockBusinesses = [
  {
    id: 1,
    name: "Pharmacie Saint-Germain",
    email: "contact@pharmstgermain.fr",
    phone: "+33 1 42 86 17 23",
    address: "45 Rue de Rivoli",
    postcode: "75001",
    city: "Paris",
    country: "France",
    category: "Pharmacy",
    sector: "pharmacy"
  },
  {
    id: 2,
    name: "Boots Pharmacy",
    email: "oxford.street@boots.co.uk",
    phone: "+44 20 7629 8484",
    address: "150 Oxford Street",
    postcode: "W1D 1DJ",
    city: "London",
    country: "UK",
    category: "Pharmacy",
    sector: "pharmacy"
  },
  {
    id: 3,
    name: "Le Petit Commerce",
    email: "info@petitcommerce.fr",
    phone: "+33 1 48 87 56 34",
    address: "23 Rue de la Paix",
    postcode: "75002",
    city: "Paris",
    country: "France",
    category: "Retail Shop",
    sector: "retail"
  },
  {
    id: 4,
    name: "Camden Market Store",
    email: "hello@camdenstyle.co.uk",
    phone: "+44 20 7485 5511",
    address: "Camden Lock Market, Chalk Farm Road",
    postcode: "NW1 8AF",
    city: "London",
    country: "UK",
    category: "Retail Shop",
    sector: "retail"
  },
  {
    id: 5,
    name: "Pharmacie Moderne",
    email: "pharmacie.moderne@gmail.com",
    phone: "+33 1 45 23 67 89",
    address: "78 Avenue des Champs-Élysées",
    postcode: "75008",
    city: "Paris",
    country: "France",
    category: "Pharmacy",
    sector: "pharmacy"
  },
  {
    id: 6,
    name: "London Fashion Boutique",
    email: "info@londonfashion.co.uk",
    phone: "+44 20 7434 9876",
    address: "42 Carnaby Street",
    postcode: "W1F 9PY",
    city: "London",
    country: "UK",
    category: "Fashion Retail",
    sector: "retail"
  },
  {
    id: 7,
    name: "Boulangerie du Marais",
    email: "contact@boulangerie-marais.fr",
    phone: "+33 1 42 72 28 11",
    address: "15 Rue des Rosiers",
    postcode: "75004",
    city: "Paris",
    country: "France",
    category: "Bakery",
    sector: "food"
  },
  {
    id: 8,
    name: "Covent Garden Wellness",
    email: "info@cgwellness.co.uk",
    phone: "+44 20 7240 5656",
    address: "28 Long Acre",
    postcode: "WC2E 9LZ",
    city: "London",
    country: "UK",
    category: "Health & Beauty",
    sector: "retail"
  }
];

const sectors = [
  { value: 'all', label: 'All Sectors' },
  { value: 'pharmacy', label: 'Pharmacy' },
  { value: 'retail', label: 'Retail Shops' },
  { value: 'food', label: 'Food & Beverage' },
  { value: 'health', label: 'Health & Beauty' }
];

const cities = [
  { value: 'all', label: 'All Cities' },
  { value: 'Paris', label: 'Paris' },
  { value: 'London', label: 'London' }
];

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSector, setSelectedSector] = useState('all');
  const [selectedCity, setSelectedCity] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const filteredBusinesses = useMemo(() => {
    return mockBusinesses.filter(business => {
      const matchesSearch = business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          business.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          business.address.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesSector = selectedSector === 'all' || business.sector === selectedSector;
      const matchesCity = selectedCity === 'all' || business.city === selectedCity;
      
      return matchesSearch && matchesSector && matchesCity;
    });
  }, [searchTerm, selectedSector, selectedCity]);

  const exportToCSV = () => {
    const headers = ['Business Name', 'Email', 'Phone', 'Address', 'Postcode', 'City', 'Country', 'Category'];
    const csvContent = [
      headers.join(','),
      ...filteredBusinesses.map(business => [
        `"${business.name}"`,
        business.email,
        business.phone,
        `"${business.address}"`,
        business.postcode,
        business.city,
        business.country,
        `"${business.category}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `business-directory-${selectedCity !== 'all' ? selectedCity.toLowerCase() : 'all-cities'}-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Building className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Business Directory</h1>
                <p className="text-sm text-gray-600">Marketing Research Tool - Paris & London</p>
              </div>
            </div>
            <button
              onClick={exportToCSV}
              disabled={filteredBusinesses.length === 0}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              <Download className="h-4 w-4 mr-2" />
              Export CSV ({filteredBusinesses.length})
            </button>
          </div>
        </div>
      </header>

      {/* Legal Notice */}
      <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mx-4 mt-4 rounded-r-lg">
        <div className="flex">
          <AlertTriangle className="h-5 w-5 text-amber-400 mr-3 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-amber-800">
            <p className="font-medium">Legal Compliance Notice</p>
            <p className="mt-1">This tool uses demonstration data. When collecting real business data, ensure compliance with GDPR, local privacy laws, and website terms of service. Always obtain proper consent for marketing communications.</p>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search businesses, categories, or addresses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center justify-center px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </button>

            {/* Desktop Filters */}
            <div className="hidden lg:flex gap-3">
              <select
                value={selectedSector}
                onChange={(e) => setSelectedSector(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white min-w-[150px]"
              >
                {sectors.map(sector => (
                  <option key={sector.value} value={sector.value}>{sector.label}</option>
                ))}
              </select>

              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white min-w-[120px]"
              >
                {cities.map(city => (
                  <option key={city.value} value={city.value}>{city.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Mobile Filters */}
          {showFilters && (
            <div className="lg:hidden mt-4 pt-4 border-t border-gray-200 flex gap-3">
              <select
                value={selectedSector}
                onChange={(e) => setSelectedSector(e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white"
              >
                {sectors.map(sector => (
                  <option key={sector.value} value={sector.value}>{sector.label}</option>
                ))}
              </select>

              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white"
              >
                {cities.map(city => (
                  <option key={city.value} value={city.value}>{city.label}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Found {filteredBusinesses.length} businesses
            {selectedCity !== 'all' && ` in ${selectedCity}`}
            {selectedSector !== 'all' && ` (${sectors.find(s => s.value === selectedSector)?.label})`}
          </h2>
        </div>

        {/* Business Cards */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredBusinesses.map(business => (
            <div key={business.id} className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{business.name}</h3>
                  <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                    {business.category}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-gray-600">
                    <p>{business.address}</p>
                    <p>{business.postcode} {business.city}, {business.country}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-gray-400 flex-shrink-0" />
                  <a href={`tel:${business.phone}`} className="text-sm text-blue-600 hover:text-blue-800 transition-colors">
                    {business.phone}
                  </a>
                </div>

                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-gray-400 flex-shrink-0" />
                  <a href={`mailto:${business.email}`} className="text-sm text-blue-600 hover:text-blue-800 transition-colors truncate">
                    {business.email}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredBusinesses.length === 0 && (
          <div className="text-center py-12">
            <Building className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No businesses found</h3>
            <p className="text-gray-500">Try adjusting your search criteria or filters.</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-gray-500">
            <p>Business Directory Marketing Research Tool</p>
            <p className="mt-1">Always ensure compliance with applicable data protection and privacy laws.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;