import React from 'react';
import { Image } from 'react-bootstrap';
import { Spring, Transition, animated, config } from 'react-spring/renderprops';

export default function Logo(props) {
  if (!props.isNotAnimate) {
    return (
      <Spring
        reset
        from={{
          transform:'scale(2) rotateX(45deg)',
        }}
        to={{
          transform:'scale(1) rotateX(0deg)',
        }}
        config={config.slow}>
        {props => (
          <div className="row" style={{alignItems:'center'}}>
          <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
           width="621.000000pt" height="647.000000pt" viewBox="0 0 621.000000 647.000000"
           preserveAspectRatio="xMidYMid meet" width="10%" height="10%" style={{...logo, ...props}}>
          <metadata>
          Created by potrace 1.16, written by Peter Selinger 2001-2019
          </metadata>
          <g id="left-logo" transform="translate(0.000000,647.000000) scale(0.100000,-0.100000)"
          fill="#000000" stroke="none">
          <path d="M2499 6056 c-185 -154 -457 -382 -604 -506 -256 -215 -325 -273 -603
          -508 l-122 -103 0 -2042 0 -2042 273 -98 c149 -55 524 -190 832 -302 l560
          -203 3 1525 c1 838 1 2208 0 3043 l-3 1518 -336 -282z"/>
          </g>
          <g id="right-logo" transform="translate(0.000000,647.000000) scale(0.100000,-0.100000)"
          fill="#000000" stroke="none">
          <path d="M3181 4283 c1 -1127 5 -2494 8 -3039 l6 -990 830 301 830 302 3 2041
          2 2041 -116 98 c-65 54 -151 127 -193 163 -128 108 -653 552 -1064 898 -152
          127 -283 232 -292 232 -13 0 -15 -217 -14 -2047z"/>
          </g>
          </svg>
          <div style={{...name, ...props}}>
          ARMY GALAXY
          </div>
          </div>
        )}
      </Spring>
    );
  } else {
    return (
      <div className="row" style={{alignItems:'center'}}>
      <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
       width="621.000000pt" height="647.000000pt" viewBox="0 0 621.000000 647.000000"
       preserveAspectRatio="xMidYMid meet" width="10%" height="10%" style={{...logo, ...props}}>
      <metadata>
      Created by potrace 1.16, written by Peter Selinger 2001-2019
      </metadata>
      <g id="left-logo" transform="translate(0.000000,647.000000) scale(0.100000,-0.100000)"
      fill="#000000" stroke="none">
      <path d="M2499 6056 c-185 -154 -457 -382 -604 -506 -256 -215 -325 -273 -603
      -508 l-122 -103 0 -2042 0 -2042 273 -98 c149 -55 524 -190 832 -302 l560
      -203 3 1525 c1 838 1 2208 0 3043 l-3 1518 -336 -282z"/>
      </g>
      <g id="right-logo" transform="translate(0.000000,647.000000) scale(0.100000,-0.100000)"
      fill="#000000" stroke="none">
      <path d="M3181 4283 c1 -1127 5 -2494 8 -3039 l6 -990 830 301 830 302 3 2041
      2 2041 -116 98 c-65 54 -151 127 -193 163 -128 108 -653 552 -1064 898 -152
      127 -283 232 -292 232 -13 0 -15 -217 -14 -2047z"/>
      </g>
      </svg>
      <div style={{...name, ...props}}>
      ARMY GALAXY
      </div>
      </div>
    );
  }
}

const logo = {
  marginLeft:30
}

const name = {
  marginLeft: 5
}
