import ReportForm from '../components/ReportForm';
import InfoCard from '../components/InfoCard';

const ReportIssue = () => {
  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="flex justify-center">
          <div className="w-full max-w-4xl">
            {/* Header */}
            <div className="text-center mb-16">
              <h1 className="text-responsive-lg font-bold mb-6 text-black">
                Report a Civic Issue
              </h1>
              <p className="text-responsive-md text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Help improve your community by reporting issues that need attention.
                Your voice matters in making our city better.
              </p>
            </div>

            {/* Form */}
            <div className="card mb-12">
              <ReportForm />
            </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ReportIssue;
