import React from "react";

function Footer(props) {
    const getCopyrightString = () => {
        const currentYear = new Date().getFullYear();
        return currentYear === props.initialYear
            ? props.initialYear
            : `${props.initialYear}-${currentYear}`;
    };

    return (
        <footer>
            <p>
                <small>
                    <a href={props.sourceCodeUrl} target="_blank" rel="noreferrer">Source Code</a> &copy; <time id="copyright-current-year">{getCopyrightString()}</time> Todd Brentlinger, Santa Cruz, CA, USA. All Rights Reserved.
                </small>
            </p>
            {props.children}
        </footer>
    );
}

export default Footer;
