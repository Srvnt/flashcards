import "./Header.css";

export function Header() {
    return (
        <div className='Header'>
            <a href='/' className='logo'>
                LOGO
            </a>
            <div className='decks1'>
                <a href='/'>Decks</a>
            </div>
            <div className='login'>
                <a href='/login'>LOGIN</a>
            </div>
        </div>
    );
}
