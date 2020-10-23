import React from 'react'
import Link from "next/link";


export default class Header extends React.Component{

	render() {
        return (
            <header>
                <nav>
                	<div className="top-bar">
                		<div className="logo">
                			<Link href="/">
                				<a>HACKER<span>NEWS</span>.</a>
                			</Link>
                		</div>
                		<div className="menu">
                			<div className="burger">
		                		<div className="burger-line"></div>
		                		<div className="burger-line"></div>
		                		<div className="burger-line"></div>
		                	</div>
		                	<div className="menu-items"></div>
                		</div>	                	
                	</div>
                	<div className="search-bar">
                		<div className="search-container">
                			<input name="search" type="text" />
                			<button type="submit">⚲</button>
                		</div>
                	</div>
                </nav>
            </header>
        )
    }
}