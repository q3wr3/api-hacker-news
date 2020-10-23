import React from 'react'
import Link from "next/link";


export default class Footer extends React.Component{

	render() {
        return (
            <footer>
                <div className="logo">
        			<Link href="/">
        				<a>HACKERNEWS.</a>
        			</Link>
        		</div>
            </footer>
        )
    }
}