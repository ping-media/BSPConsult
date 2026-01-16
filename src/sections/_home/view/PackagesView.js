import { useNavigate } from 'react-router';
import '../../../App.css';
import './PackagesView.css';

import {
  Packages
} from '../components';

// ----------------------------------------------------------------------

export default function PackagesView() {
  const navigate = useNavigate();

  // const handleProgramClick = (programId) => {
  //   navigate('/payment-success', {
  //     replace: true,
  //     state: { program: programId },
  //   });
  // };

  return (
    <div className="packages-pages">
      {/* NAVBAR */}
      <div className="navbar">
        <div className="navbar-inner">
          <div className="brand">
            <a href="/" className="brand-link">
              <img
                src="img/bsplogo.png"
                alt="BSP Consult"
                className="brand-logo"
              />
              <span className="brand-text">
                <strong>BSP</strong> CONSULT
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* PRICE SECTION */}
     <Packages/>
    </div>
  );
}


