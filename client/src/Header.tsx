import "./Header.css";
import logo from "./assets/logo_transparent.png";

export function Header() {
    return (
        <div className='Header'>
            <img className='image' src={logo} alt='logo' />
            <div className='decks1'>
                <a href='/'>Decks</a>
            </div>
        </div>
    );
}
