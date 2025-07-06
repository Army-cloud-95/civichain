import ReportForm from '../components/ReportForm';
import InfoCard from '../components/InfoCard';

const ReportIssue = () => {
  return (
    <div className="min-h-screen pt-20" style={{ backgroundColor: '#F6F5FA' }}>
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex justify-center">
          <div className="w-full max-w-2xl">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4" style={{ color: '#212121' }}>
                Report a Civic Issue
              </h1>
              <p className="text-lg" style={{ color: '#212121', opacity: '0.8' }}>
                Help improve your community by reporting issues that need attention.
                Your voice matters in making our city better.
              </p>
            </div>

            {/* Form */}
            <ReportForm />

            {/* Additional Information */}
            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <div 
                className="rounded-2xl p-6"
                style={{ backgroundColor: '#DBDFE9' }}
              >
                <h3 className="text-xl font-semibold mb-6" style={{ color: '#212121' }}>What Happens Next?</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span 
                      className="mt-1 w-6 h-6 rounded-full flex items-center justify-center text-sm font-semibold"
                      style={{ backgroundColor: '#EFF0A3', color: '#212121' }}
                    >1</span>
                    <p style={{ color: '#212121', opacity: '0.8' }}>Our AI system verifies and categorizes your report</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span 
                      className="mt-1 w-6 h-6 rounded-full flex items-center justify-center text-sm font-semibold"
                      style={{ backgroundColor: '#EFF0A3', color: '#212121' }}
                    >2</span>
                    <p style={{ color: '#212121', opacity: '0.8' }}>Report is logged on the blockchain for transparency</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span 
                      className="mt-1 w-6 h-6 rounded-full flex items-center justify-center text-sm font-semibold"
                      style={{ backgroundColor: '#EFF0A3', color: '#212121' }}
                    >3</span>
                    <p style={{ color: '#212121', opacity: '0.8' }}>Relevant authorities are notified automatically</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span 
                      className="mt-1 w-6 h-6 rounded-full flex items-center justify-center text-sm font-semibold"
                      style={{ backgroundColor: '#EFF0A3', color: '#212121' }}
                    >4</span>
                    <p style={{ color: '#212121', opacity: '0.8' }}>You receive updates on the progress</p>
                  </li>
                </ul>
              </div>

              <div 
                className="rounded-2xl p-6"
                style={{ backgroundColor: '#CFDECA' }}
              >
                <h3 className="text-xl font-semibold mb-6" style={{ color: '#212121' }}>Tips for Effective Reporting</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span 
                      className="mt-1 w-2 h-2 rounded-full"
                      style={{ backgroundColor: '#EFF0A3' }}
                    ></span>
                    <p style={{ color: '#212121', opacity: '0.8' }}>Be specific about the location and issue</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span 
                      className="mt-1 w-2 h-2 rounded-full"
                      style={{ backgroundColor: '#EFF0A3' }}
                    ></span>
                    <p style={{ color: '#212121', opacity: '0.8' }}>Include clear, well-lit photos when possible</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span 
                      className="mt-1 w-2 h-2 rounded-full"
                      style={{ backgroundColor: '#EFF0A3' }}
                    ></span>
                    <p style={{ color: '#212121', opacity: '0.8' }}>Provide context about when you noticed the issue</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span 
                      className="mt-1 w-2 h-2 rounded-full"
                      style={{ backgroundColor: '#EFF0A3' }}
                    ></span>
                    <p style={{ color: '#212121', opacity: '0.8' }}>Mention if it's a recurring problem</p>
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