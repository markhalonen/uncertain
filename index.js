var gaussianShape = [2.1806912006057086e-06,
    2.1806912006057086e-06,
    8.7227648024228344e-06,
    1.0903456003028544e-05,
    2.6168294407268506e-05,
    1.3084147203634253e-05,
    4.7975206413325594e-05,
    5.6697971215748425e-05,
    0.00012866078083573681,
    0.00013956423683876535,
    0.00021806912006057088,
    0.00035763335689933625,
    0.00057134109455869568,
    0.00081775920022714079,
    0.0011470435715186028,
    0.0017707212548918356,
    0.0025710349255141304,
    0.0037071750410297049,
    0.0052598271758609698,
    0.0072289913300079243,
    0.0098894345947468897,
    0.01335455291250936,
    0.01864927114758002,
    0.024415018681981517,
    0.032241519400955404,
    0.041893258654836271,
    0.054065876936617338,
    0.068478065081420472,
    0.08678278701930478,
    0.10874888948300609,
    0.13434148141331467,
    0.16434561164244862,
    0.19739834817002935,
    0.23601620864155587,
    0.27790728660519154,
    0.32533077814476385,
    0.37684960775907372,
    0.43103978409412558,
    0.48576641046452645,
    0.54438993201040975,
    0.60082840097328605,
    0.65656032598716618,
    0.71095330660387435,
    0.76137960992668074,
    0.80828191626930834,
    0.84492407051308605,
    0.87542539833595812,
    0.89794539636461324,
    0.90676411157986281,
    0.90909090909090906,
    0.90149556163919942,
    0.88242977847230364,
    0.85760697053580892,
    0.82281622312134539,
    0.78168402569552053,
    0.73222812995698372,
    0.68108655992037859,
    0.62511912025683303,
    0.56656974221177037,
    0.50904528903099244,
    0.45403735349571339,
    0.39851695552829208,
    0.34656416836506165,
    0.29689456488886545,
    0.25234522435169138,
    0.21195010055167127,
    0.17744066230208591,
    0.14640942651746669,
    0.11874735863778327,
    0.095178448141636757,
    0.075990546267507134,
    0.05977492649980308,
    0.046398566675287661,
    0.036245268445267487,
    0.02686611559146233,
    0.020751457464963926,
    0.015362969508267219,
    0.011141151343894566,
    0.0083062527831071452,
    0.006051418081680842,
    0.0044093576076247431,
    0.0030093538568358781,
    0.0020149586693596747,
    0.0014545210308040076,
    0.00097913034907196332,
    0.00061495491857080982,
    0.00047320999053143882,
    0.00024641810566844506,
    0.0002006235904557252,
    0.00011993801603331397,
    8.2866265623016938e-05,
    3.0529676808479925e-05,
    2.8348985607874212e-05,
    1.9626220805451378e-05,
    1.0903456003028544e-05,
    4.3613824012114172e-06,
    4.3613824012114172e-06,
    4.3613824012114172e-06,
    2.1806912006057086e-06,
    4.3613824012114172e-06]
// 2. Use the margin convention practice 
var margin = { top: 50, right: 50, bottom: 50, left: 50 }
    , width = window.innerWidth - margin.left - margin.right // Use the window's width 
    , height = window.innerHeight - margin.top - margin.bottom; // Use the window's height

// The number of datapoints
var n = gaussianShape.length;

// 5. X scale will use the index of our data
var xScale = d3.scaleLinear()
    .domain([0, n - 1]) // input
    .range([0, width]); // output

// 6. Y scale will use the randomly generate number 
var yScale = d3.scaleLinear()
    .domain([0, 1]) // input 
    .range([height, 0]); // output 

// 7. d3's line generator
var line = d3.line()
    .x(function (d, i) { return xScale(i); }) // set the x values for the line generator
    .y(function (d) { return yScale(d.y); }) // set the y values for the line generator 
    .curve(d3.curveMonotoneX) // apply smoothing to the line

// 8. An array of objects of length N. Each object has key -> value pair, the key being "y" and the value is a random number
var dataset = d3.range(n).map(function (d, i) { return { "y": gaussianShape[i] } })

// 1. Add the SVG to the page and employ #2
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)

svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// 3. Call the x axis in a group tag
svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xScale)); // Create an axis component with d3.axisBottom

// text label for the x axis
svg.append("text")
    .attr("transform",
        "translate(" + (width / 2) + " ," +
        (height + margin.top - 10) + ")")
    .style("text-anchor", "middle")
    .text("Outcome");

// 4. Call the y axis in a group tag
svg.append("g")
    .attr("class", "y axis")
    .call(d3.axisLeft(yScale).tickValues([])); // Create an axis component with d3.axisLeft

// text label for the y axis
svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Probability");

// 9. Append the path, bind the data, and call the line generator 
var path = svg.append("path")
    .datum(dataset) // 10. Binds data to the line 
    .attr("class", "line") // Assign a class for styling 
    .attr("d", line); // 11. Calls the line generator 

svg.on("mousemove", function () {
    if (d3.event.ctrlKey) {
        var coords = d3.mouse(this);

        var closestIdx = Math.floor(xScale.invert(coords[0]));

        dataset[closestIdx] = {
            y: yScale.invert(coords[1])
        }

        // 9. Append the path, bind the data, and call the line generator 
        path
            .datum(dataset) // 10. Binds data to the line 
            .attr("class", "line") // Assign a class for styling 
            .attr("d", line); // 11. Calls the line generator 
    }

})
    .append('rect')
    .attr('class', 'click-capture')
    .style('visibility', 'hidden')
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', width)
    .attr('height', height);