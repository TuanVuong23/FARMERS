import '../App.css';
import { Button } from './Button';
import './HeroSection.css';
import { useNavigate } from 'react-router-dom';

function HeroSection() {
  const navigate = useNavigate();

  const handleInsertClick = () => {
    navigate('/products');
  }

  const handleHistoryClick = () => {
    navigate('/HistoryPage');
  }

  return (
    <div className='hero-container'>
      {/* <video src='/videos/video-1.mp4' autoPlay loop muted /> */}
      <h1>NPK Detective</h1>
      <p>What are you waiting for?</p>
      <div className='hero-btns'>
        <Button
          className='btns'
          buttonStyle='btn--history'
          buttonSize='btn--large'
          onClick={handleInsertClick}
        >
          INSERT NOW
        </Button>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
          onClick={handleHistoryClick}
        >
          HISTORY
        </Button>
      </div>
    </div>
  );
}

export default HeroSection;