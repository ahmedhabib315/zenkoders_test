import React from 'react';
import { useNavigate } from 'react-router'

function Nav(props: any) {
  const navigate = useNavigate();
  return (
    <>
      <div>
        <div>
          <div>
            Logo
            { props.loggedin && <input type="text" placeholder='Find any news here' />}
          </div>
          <div>
            {
              !props.loggedin && <button onClick={()=> navigate('/login')}>Login</button>
            }
          </div>
          <div>
            {
              !props.loggedin && <button onClick={()=> navigate('/signup')}>Sign up</button>
            }
          </div>
          <div>
            {
              props.loggedin && <button onClick={()=> navigate('/logout')}>Logout</button>
            }
          </div>
        </div>
        {
          props.loggedin && <div>
          <ul>
            <li>
              Home
            </li>
            <li>
              World
            </li>
            <li>
              Politics
            </li>
            <li>
              Business
            </li>
            <li>
              Technology
            </li>
            <li>
              Science
            </li>
            <li>
              Health
            </li>
            <li>
              Sports
            </li>
            <li>
              Arts
            </li>
            <li>
              Style
            </li>
            <li>
              Food
            </li>
          </ul>
        </div>
        }
        
      </div>
    </>
  )
}

export default React.memo(Nav)