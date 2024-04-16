import './Welcome.css'
import { Link } from 'react-router-dom'


const Welcome = () => {
    return ( 
        <div className='all_app'>
            <div className="app_text_container">
                <div className="text">
                    <h1 className='h1'>WELCOME TO JARVIS</h1>
                    <Link className='btn' to='/chat'>Talk to Jarvis</Link>
                </div>
            </div>
        </div>
     );
}
 
export default Welcome;