import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {
  return (
    <div className='footer-container'>
        <section className='footer-subscription'>
            <p className='footer-subscription-heading'>
                Join the BuyMore  to recive our best deals
            </p>
            <p className='footer-subscription-text'>
                You can unsubscribe any time.
            </p>
            <div className='input-areas'>
                <form >
                    <input type='email'
                    name='email'
                    placeholder='Your Email'
                    className='footer-inputs'/>
                    <button className='footer-btn'>Subscribe</button>
                </form>
            </div>
        </section>
        <div className='footer-links'>
        <div className='footer-link-wrapper'>
          <div class='footer-link-items'>
            <h2>About Us</h2>
            <Link to='/sign-up'>How it works</Link>
            <Link to='/'>Testimonials</Link>
            <Link to='/'>Careers</Link>
            <Link to='/'>Investors</Link>
            <Link to='/'>Terms of Service</Link>
          </div>
          <div class='footer-link-items'>
            <h2>Contact Us</h2>
            <Link to='/'>Contact</Link>
            <Link to='/'>Support</Link>
            <Link to='/'>Destinations</Link>
            <Link to='/'>Sponsorships</Link>
          </div>
        </div>
        <div className='footer-link-wrapper'>
          {/* <div class='footer-link-items'>
            <h2>Videos</h2>
            <Link to='/'>Submit Video</Link>
            <Link to='/'>Ambassadors</Link>
            <Link to='/'>Agency</Link>
            <Link to='/'>Influencer</Link>
          </div> */}
          <div class='footer-link-items'>
            <h2>Social Media</h2>
            <Link to='/'>Instagram</Link>
            <Link to='/'>Facebook</Link>
            <Link to='/'>Youtube</Link>
            <Link to='/'>Twitter</Link>
          </div>
        </div>
        </div>
        <section className='social-media'>
        <div class='social-media-wrap'>
          <div class='footer-logo'>
            <Link to='/' className='social-logo'>
              <h3>BUY<small>More</small></h3>
              <i class="fas fa-shopping-cart"></i>
            </Link>
          </div>
          <small class='website-rights'>BUYMore © 2022</small>
          <div class='social-icons'>
            <a  className='social-icon-link facebook' 
              target='_blank'
              rel='noopener noreferrer'
              href='https://www.facebook.com/'>
                  <i class='fab fa-facebook-f' />
            </a>
            <a  className='social-icon-link instagram' 
            target='_blank'
            rel='noopener noreferrer'
            href='https://www.instagram.com/'>
                <i class='fab fa-instagram' />
            </a>
            <a  className='social-icon-link youtube' 
            target='_blank'
            rel='noopener noreferrer'
            href='https://www.youtube.com/'>
                <i class='fab fa-youtube' />
            </a>
            <a  className='social-icon-link twitter' 
            target='_blank'
            rel='noopener noreferrer'
            href='https://twitter.com/explore'>
                <i class='fab fa-twitter' />
            </a>
            <a  className='social-icon-link linkedin' 
            target='_blank'
            rel='noopener noreferrer'
            href='https://www.linkedin.com/signup'>
                <i class='fab fa-linkedin' />
            </a>
          </div>
        </div>
        </section>
    </div>
  )
}

export default Footer