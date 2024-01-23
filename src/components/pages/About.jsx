import React from 'react';
import '../../App.css';
import Footer from '../Footer';
import './About.css'

function About() {
  return (
    <>
    <section className='about'>
    <div className="container">
      <h1 className="heading">Meet The Team</h1>
      <div className="card-wrapper">
        <div className="card">
          <img src="src\components\images\predict.png" alt="card background" className="card-img" />
          <img src="src\components\images\predict.png" alt="profile image" className="profile-img" />
          <h1>Nguyễn Tuấn Vương</h1>
          <p className="job-title">Web Developer</p>
          <p className="about">Tôi thích màu hồng và gét sự giả dối</p>
          <a href="#" className="btn">Contact</a>
          <ul className="social-media">
            <li><a href="#"><i className="fab fa-facebook-square"></i></a></li>
            <li><a href="#"><i className="fab fa-twitter-square"></i></a></li>
            <li><a href="#"><i className="fab fa-instagram"></i></a></li>
            <li><a href="#"><i className="fab fa-google-plus-square"></i></a></li>
          </ul>
        </div>
        <div className="card">
          <img src="src\components\images\predict.png" alt="card background" className="card-img" />
          <img src="src\components\images\predict.png" alt="profile image" className="profile-img" />
          <h1>Hoàng Minh Đức</h1>
          <p class="job-title">mobile Developer</p>
          <p class="about"> ChatGpt là người bạn đồng hành đáng tin cậy của tôi tại USTH</p>
          <a href="#" className="btn">Contact</a>
          <ul className="social-media">
            <li><a href="#"><i className="fab fa-facebook-square"></i></a></li>
            <li><a href="#"><i className="fab fa-twitter-square"></i></a></li>
            <li><a href="#"><i className="fab fa-instagram"></i></a></li>
            <li><a href="#"><i className="fab fa-google-plus-square"></i></a></li>
          </ul>
        </div>
        <div className="card">
          <img src="src\components\images\predict.png" alt="card background" className="card-img" />
          <img src="src\components\images\predict.png" alt="profile image" className="profile-img" />
          <h1>Nguyễn Hoàng Nam</h1>
          <p class="job-title">Back-end Developer</p>
          <p class="about"> Mặc dù là thằng công nhân nhưng cuộc đời do tôi quản lý</p>
          <a href="#" class="btn">Contact</a>
          <ul className="social-media">
            <li><a href="#"><i className="fab fa-facebook-square"></i></a></li>
            <li><a href="#"><i className="fab fa-twitter-square"></i></a></li>
            <li><a href="#"><i className="fab fa-instagram"></i></a></li>
            <li><a href="#"><i className="fab fa-google-plus-square"></i></a></li>
          </ul>
        </div>
        <div className="card">
          <img src="src\components\images\predict.png" alt="card background" className="card-img" />
          <img src="src\components\images\predict.png" alt="profile image" className="profile-img" />
          <h1>Lê Ngọc Phan Anh</h1>
          <p class="job-title">Back-end Developer</p>
          <p class="about"> Tôi thích giúp mà chẳng cần húp</p>
          <a href="#" class="btn">Contact</a>
          <ul className="social-media">
            <li><a href="#"><i className="fab fa-facebook-square"></i></a></li>
            <li><a href="#"><i className="fab fa-twitter-square"></i></a></li>
            <li><a href="#"><i className="fab fa-instagram"></i></a></li>
            <li><a href="#"><i className="fab fa-google-plus-square"></i></a></li>
          </ul>
        </div>
        <div className="card">
          <img src="src\components\images\predict.png" alt="card background" className="card-img" />
          <img src="src\components\images\predict.png" alt="profile image" className="profile-img" />
          <h1>Nguyễn Anh Quân</h1>
          <p class="job-title">Data Scientist</p>
          <p class="about"> Giúp là phải được húp, nói thẳng thế cho nhanh</p>
          <a href="#" class="btn">Contact</a>
          <ul className="social-media">
            <li><a href="#"><i className="fab fa-facebook-square"></i></a></li>
            <li><a href="#"><i className="fab fa-twitter-square"></i></a></li>
            <li><a href="#"><i className="fab fa-instagram"></i></a></li>
            <li><a href="#"><i className="fab fa-google-plus-square"></i></a></li>
          </ul>
        </div>
        <div className="card">
          <img src="src\components\images\predict.png" alt="card background" className="card-img" />
          <img src="src\components\images\predict.png" alt="profile image" className="profile-img" />
          <h1>Phạm Xuân Trung</h1>
          <p class="job-title">Data Scientist</p>
          <p class="about"> Không ngán bố con thằng nào</p>
          <a href="#" className="btn">Contact</a>
          <ul className="social-media">
            <li><a href="#"><i className="fab fa-facebook-square"></i></a></li>
            <li><a href="#"><i className="fab fa-twitter-square"></i></a></li>
            <li><a href="#"><i className="fab fa-instagram"></i></a></li>
            <li><a href="#"><i className="fab fa-google-plus-square"></i></a></li>
          </ul>
        </div>
        <div className="card">
          <img src="src\components\images\predict.png" alt="card background" className="card-img" />
          <img src="src\components\images\predict.png" alt="profile image" className="profile-img" />
          <h1>Hoàng Hà Đăng</h1>
          <p class="job-title">Data Scientist</p>
          <p class="about"> Muốn đi nhanh thì đi 1 mình, muốn đi xa thì đi máy bay</p>
          <a href="#" className="btn">Contact</a>
          <ul className="social-media">
            <li><a href="#"><i className="fab fa-facebook-square"></i></a></li>
            <li><a href="#"><i className="fab fa-twitter-square"></i></a></li>
            <li><a href="#"><i className="fab fa-instagram"></i></a></li>
            <li><a href="#"><i className="fab fa-google-plus-square"></i></a></li>
          </ul>
        </div>
      </div>
    </div>
    </section>
      <Footer />
    </>
  );
}

export default About;