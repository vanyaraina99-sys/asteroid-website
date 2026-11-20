console.log('hello world');
const asteroidData = {eros: {
        name: "433 Eros",
        a: 1.46,
        e: 0.22,
        i: 10.83,
        ascendingNode: 304.3,
        perihelion: 178.9
    }, 
    ceres:{
        name: "1 Ceres",
        a: 2.77,
        e: 0.0785,
        i: 10.6,
        ascendingNode: 80.25,
        perihelion: 73.3 
        
    },
    psyche:{
        name: "16 Psyche",
        a: 2.92,
        e: 0.134,
        i: 3.1,
        ascendingNode: 150.03,
        perihelion: 229.8
    },
    ida:{
        name: "243 Ida",
        a: 2.861,
        e: 0.041,
        i: 1.132,
        ascendingNode: 324.016,
        perihelion: 113.26
    }
}
const asteroidSelection = document.getElementById('asteroidChoices')
const semiMajorAxisInput = document.getElementById('semiMajorAxis');
const eccentricity = document.getElementById('eccentricity');
const inclination = document.getElementById('inclination');
const calcbuttonInput = document.getElementById('calcbutton');
const resulttextInput = document.getElementById('resulttext');
const resetbutton = document.getElementById('resetbutton');
const orbitPlot = document.getElementById('orbitPlot')
const ascendingNodeInput = document.getElementById('ascendingNode');
const perihelionDegrees = document.getElementById('perihelionDegrees');

console.log('semiMajorAxisInput:',semiMajorAxisInput);
console.log('eccentricity:',eccentricity);
console.log('calculateButton:',calcbuttonInput);
console.log('resultText:',resulttextInput);
asteroidSelection.addEventListener("change",function(){
    const selectedAsteroid = asteroidSelection.value;
    if (selectedAsteroid == ''){
        return;
    }
    const asteroid=asteroidData[selectedAsteroid];
    
    semiMajorAxisInput.value = asteroid.a;
    eccentricity.value = asteroid.e;
    inclination.value = asteroid.i;
    ascendingNodeInput.value = asteroid.ascendingNode;
    perihelionDegrees.value = asteroid.perihelion;
});

calcbuttonInput.addEventListener("click",function(){
    console.log('Calculate button clicked!');
    const semiMajorAxisvalue = semiMajorAxisInput.value;
    const eccentricityvalue = eccentricity.value;
    const inclinationvalue = inclination.value;
    const ascendingNodeDegrees = ascendingNodeInput.value;
    const argumentPerihelionDegrees = perihelionDegrees.value;
function degreesToRadians(inclinationvalue) {
    return inclinationvalue * Math.PI / 180;
}


function generateOrbit3D(semiMajorAxisvalue, eccentricityvalue, inclinationDegrees, ascendingNodeDegrees, argumentPerihelionDegrees) {
    const xValues = [];
    const yValues = [];
    const zValues = [];

    const inclination = degreesToRadians(inclinationDegrees);
    const ascendingNode = degreesToRadians(ascendingNodeDegrees);
    const argumentPerihelion = degreesToRadians(argumentPerihelionDegrees);

    const numberOfPoints = 300;

    for (let j = 0; j <= numberOfPoints; j++) {
        const trueAnomaly = 2 * Math.PI * j / numberOfPoints;

        const r = semiMajorAxisnum * (1 - eccentricitynum * eccentricitynum) / (1 + eccentricitynum * Math.cos(trueAnomaly));

        const angleInOrbitPlane = argumentPerihelion + trueAnomaly;

        const x =
            r *
            (
                Math.cos(ascendingNode) * Math.cos(angleInOrbitPlane)
                - Math.sin(ascendingNode) * Math.sin(angleInOrbitPlane) * Math.cos(inclination)
            );

        const y =
            r *
            (
                Math.sin(ascendingNode) * Math.cos(angleInOrbitPlane)
                + Math.cos(ascendingNode) * Math.sin(angleInOrbitPlane) * Math.cos(inclination)
            );

        const z =
            r *
            (
                Math.sin(angleInOrbitPlane) * Math.sin(inclination)
            );

        xValues.push(x);
        yValues.push(y);
        zValues.push(z);
    }

    return {
        x: xValues,
        y: yValues,
        z: zValues
    };
}
function draw_orbit(semiMajorAxisInput,eccentricity,inclination,ascendingNodeInput,perihelionDegrees){
    const orbit = generateOrbit3D(semiMajorAxisInput,eccentricity,inclination,ascendingNodeInput,perihelionDegrees);
    const orbitTrace = {
        x: orbit.x,
        y: orbit.y,
        z: orbit.z,
        mode: "lines",
        type: "scatter3d",
        name: "Asteroid orbit",
        line:{
            width: 5
        }
    };
    const sunTrace = {
        x: [0],
        y: [0],
        z: [0],
        mode: "markers",
        type: "scatter3d",
        name: "sunobj",
        marker:{
            size: 6
        }
    };
    const layout={
        title:"Simplified 3D Asteriod Orbit",
        scene:{
            xaxis:{title:"X(AU)"},
            yaxis:{title:"Y(AU)"},
            zaxis:{title:"Z(AU)"},
            aspectmode:"data"
        },
        margin:{
            l:0,
            r:0,
            b:0,
            t:40
        }
    };
    Plotly.newPlot("orbitPlot",[orbitTrace,sunTrace],layout);
}    

    if (semiMajorAxisvalue.trim()=='' || eccentricityvalue.trim()=='' || inclinationvalue.trim()=='' || ascendingNodeDegrees.trim()=='' || argumentPerihelionDegrees.trim=='')
        {resulttextInput.textContent="Please enter a valid input";
        return;
        }
    
    const semiMajorAxisnum = Number(semiMajorAxisvalue);
    const eccentricitynum = Number(eccentricityvalue);
    const inclinationnum = Number(inclinationvalue);
    const ascendingNodenum = Number(ascendingNodeDegrees);
    const perihelionDegreenum = Number(argumentPerihelionDegrees);

    if (Number.isNaN(semiMajorAxisnum) || Number.isNaN(eccentricitynum) || Number.isNaN(inclinationnum) || Number.isNaN(ascendingNodenum) || Number.isNaN(perihelionDegreenum)){
        resulttextInput.textContent="Please enter a number";
        return;
        }

    if (semiMajorAxisnum < 0  ){
    
        
        resulttextInput.textContent="Please enter a number that is greater than zero for the semi-major axis";
        return;
        } 
    
    if (0 > eccentricitynum || eccentricitynum > 1){


        resulttextInput.textContent="Please enter a number that is greater than zero and less than one for eccentricity";
        return;
    }

    if (0 > inclinationnum || inclinationnum > 180){


        resulttextInput.textContent="Please enter a number that is greater than zero and less than 180 for the inclination";
    }

    if (0 > ascendingNodenum || ascendingNodenum > 360){


        resulttextInput.textContent='Please enter a number that is greater than zero and less than 360 for the longitude ascending node';

    }

    if (0 > perihelionDegreenum || perihelionDegreenum > 360){


        resulttextInput.textContent='Please enter a number that is greater than zero and less than 260 for the perihelion degrees';
    }


    else
        {resulttextInput.textContent="Input accepted.";}
        
        
        
  
        

    const perihelion = semiMajorAxisnum * (1 - eccentricitynum);
    const aphelion = semiMajorAxisnum * (1 + eccentricitynum);
    const orbitalperiod = Math.pow(semiMajorAxisnum,1.5);
    resulttextInput.textContent = `The perihelion is ${perihelion.toFixed(2)} and the aphelion is ${aphelion.toFixed(2)}, the orbital period is ${orbitalperiod.toFixed(2)}.`;

    draw_orbit(semiMajorAxisnum,eccentricitynum,inclinationnum);
});
resetbutton.addEventListener("click",function(){
    console.log('Reset button clicked!');
    Plotly.purge('orbitPlot')
    semiMajorAxisInput.value = '';
    eccentricity.value = '';
    inclination.value = '';
    ascendingNodeInput.value = '';
    perihelionDegrees.value = '';
    asteroidSelection.value = '';
    resulttextInput.textContent = '';
    ;
});