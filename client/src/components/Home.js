import React, { useEffect, useState } from 'react'
import BankImage from './Bank.jpg'

import './home.css'

const Home = () => {
  const [userName, setUserName] = useState('')

  useEffect(() => {
    // Retrieve the name from localStorage
    const name = localStorage.getItem('userName')
    if (name) {
      setUserName(name) // Set the name in state
    }
  }, []) // Empty dependency array ensures it runs only once when component mounts

  return (
    <div>
      <div className="homeContainer">
        {/* Second Header with logo, search bar, and buttons */}

        {/* Section 1 */}
        <section className="first-section">
          <div className="container">
            <h1 className="build">Innovative Banking Solutions</h1>
            <article className="first-article">
              <p>
                Leading the Way in Digital Banking Services
                <br />
                #1 in Customer Satisfaction in France
                <br />
                #1 in Security and Transaction Speed
              </p>
            </article>

            <div className="second-button">
              <a className="news" href="https://mabanque.bnpparibas/">
                News
              </a>
              <a
                className="company"
                href="https://banqueentreprise.bnpparibas/"
              >
                Company{' '}
              </a>
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section className="second-section">
          <div className="second-container">
            <img
              className="bankImgClass"
              src={BankImage}
              alt="Bank building image"
            />
            <h2 className="second-title">
              Bring the best of secure banking tools to your company
            </h2>
            <p>
              "Our banking platform is trusted by millions of businesses
              worldwide. <br></br> Your teams already use our trusted tools,and
              your company depends on secure, seamless transactions. <br></br>{' '}
              Create an account and get more out of the banking services your
              team already knows and trusts."
            </p>
          </div>
        </section>

        {/* Section 3 */}
        <section className="third-section">
          <div className="third-container">
            <div className="first-div">
              <h3>Zero configuration</h3>
              <p>
                Create a business account, add your team, and start banking. No
                complex configurations.
              </p>
            </div>

            <div className="second-div">
              <h3>Team Management</h3>
              <p>
                Control who has access to what within your company's financial
                operations.
              </p>
            </div>

            <div className="third-div">
              <h3>Familiar features</h3>
              <p>
                Our platform offers 100% compatibility with the most widely used
                banking features.
              </p>
            </div>

            <div className="fourth-div">
              <h3>Security audit</h3>
              <p>
                "Enjoy advanced security features built into our banking
                platform.
              </p>
            </div>
          </div>

          <div className="last-button">
            <a href="https://banqueentreprise.bnpparibas/">Discover more</a>
          </div>
        </section>
      </div>
      <footer className="footer">
        <p>copyright© 2024 Aissetou Yoojeong Yahia</p>
      </footer>
    </div>
  )
}

export default Home
