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

            {/* Additional Information */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="card">
                <h3 className="text-xl font-semibold mb-6 text-black">What Happens Next?</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-4">
                    <span className="mt-1 w-8 h-8 bg-gradient-to-br from-primary to-primary-light rounded-full flex items-center justify-center text-sm font-semibold text-white">
                      1
                    </span>
                    <p className="text-gray-600 leading-relaxed">Our AI system verifies and categorizes your report</p>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="mt-1 w-8 h-8 bg-gradient-to-br from-primary to-primary-light rounded-full flex items-center justify-center text-sm font-semibold text-white">
                      2
                    </span>
                    <p className="text-gray-600 leading-relaxed">Report is logged on the blockchain for transparency</p>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="mt-1 w-8 h-8 bg-gradient-to-br from-primary to-primary-light rounded-full flex items-center justify-center text-sm font-semibold text-white">
                      3
                    </span>
                    <p className="text-gray-600 leading-relaxed">Relevant authorities are notified automatically</p>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="mt-1 w-8 h-8 bg-gradient-to-br from-primary to-primary-light rounded-full flex items-center justify-center text-sm font-semibold text-white">
                      4
                    </span>
                    <p className="text-gray-600 leading-relaxed">You receive updates on the progress</p>
                  </li>
                </ul>
              </div>

              <div className="card">
                <h3 className="text-xl font-semibold mb-6 text-black">Tips for Effective Reporting</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-4">
                    <span className="mt-2 w-3 h-3 bg-gradient-to-br from-primary to-primary-light rounded-full"></span>
                    <p className="text-gray-600 leading-relaxed">Be specific about the location and issue</p>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="mt-2 w-3 h-3 bg-gradient-to-br from-primary to-primary-light rounded-full"></span>
                    <p className="text-gray-600 leading-relaxed">Include clear, well-lit photos when possible</p>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="mt-2 w-3 h-3 bg-gradient-to-br from-primary to-primary-light rounded-full"></span>
                    <p className="text-gray-600 leading-relaxed">Provide context about when you noticed the issue</p>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="mt-2 w-3 h-3 bg-gradient-to-br from-primary to-primary-light rounded-full"></span>
                    <p className="text-gray-600 leading-relaxed">Mention if it's a recurring problem</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportIssue;