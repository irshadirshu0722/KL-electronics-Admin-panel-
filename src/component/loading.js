


export const Loading = ()=>(
    
    <div className="errorpop"  style={{
        position: 'fixed',
        top: '0',
        left: '0',
        right:0,
        bottom:0,
        opacity: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,   
        background:'black'
            }}>
    <svg width="200px" height="200px"   xmlns="http://www.w3.org/2000/svg" xlinkHref="http://www.w3.org/1999/xlink" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" style={{opacity:"1"}}>
    <circle cx="75" cy="50" fill="white" r="6.39718">
        <animate attributeName="r" values="4.8;4.8;8;4.8;4.8" keyTimes="0;0.1;0.2;0.3;1" dur="1s" repeatCount="indefinite" begin="-0.875s"></animate>
    </circle>
    <circle cx="67.678" cy="67.678" fill="white" r="4.8">
        <animate attributeName="r" values="4.8;4.8;8;4.8;4.8" keyTimes="0;0.1;0.2;0.3;1" dur="1s" repeatCount="indefinite" begin="-0.75s"></animate>
    </circle>
    <circle cx="50" cy="75" fill="white" r="4.8">
        <animate attributeName="r" values="4.8;4.8;8;4.8;4.8" keyTimes="0;0.1;0.2;0.3;1" dur="1s" repeatCount="indefinite" begin="-0.625s"></animate>
    </circle>
    <circle cx="32.322" cy="67.678" fill="white" r="4.8">
        <animate attributeName="r" values="4.8;4.8;8;4.8;4.8" keyTimes="0;0.1;0.2;0.3;1" dur="1s" repeatCount="indefinite" begin="-0.5s"></animate>
    </circle>
    <circle cx="25" cy="50" fill="white" r="4.8">
        <animate attributeName="r" values="4.8;4.8;8;4.8;4.8" keyTimes="0;0.1;0.2;0.3;1" dur="1s" repeatCount="indefinite" begin="-0.375s"></animate>
    </circle>
    <circle cx="32.322" cy="32.322" fill="white" r="4.80282">
        <animate attributeName="r" values="4.8;4.8;8;4.8;4.8" keyTimes="0;0.1;0.2;0.3;1" dur="1s" repeatCount="indefinite" begin="-0.25s"></animate>
    </circle>
    <circle cx="50" cy="25" fill="white" r="6.40282">
        <animate attributeName="r" values="4.8;4.8;8;4.8;4.8" keyTimes="0;0.1;0.2;0.3;1" dur="1s" repeatCount="indefinite" begin="-0.125s"></animate>
    </circle>
    <circle cx="67.678" cy="32.322" fill="white" r="7.99718">
        <animate attributeName="r" values="4.8;4.8;8;4.8;4.8" keyTimes="0;0.1;0.2;0.3;1" dur="1s" repeatCount="indefinite" begin="0s"></animate>
    </circle>
</svg>
</div>
)

     
     