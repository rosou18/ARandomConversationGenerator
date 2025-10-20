// Vote counters
let votesOption1 = 0;
let votesOption2 = 0;

// Smooth animation variables for better visual experience
let currentAngles = [0, 0];  // Current pie chart angles
let currentOffsetX = 0;       // Current mouse offset X
let currentOffsetY = 0;       // Current mouse offset Y

function setup() {
  createCanvas(400, 400);
  // No need for noLoop() - we want smooth continuous animation

  // Option 1 Button - "Be Homeless"
  let button1 = createButton('🏠 Be Homeless');
  button1.position(50, 360);
  button1.mousePressed(() => {
    votesOption1++;
  });

  // Option 2 Button - "Be in Prison"
  let button2 = createButton('🔒 Be in Prison');
  button2.position(250, 360);
  button2.mousePressed(() => {
    votesOption2++;
  });
}

function draw() {
  background(255);

  // Calculate total votes and target angles for pie chart
  let totalVotes = votesOption1 + votesOption2;
  let targetAngles = totalVotes > 0 ? [
    (votesOption1 / totalVotes) * TWO_PI,
    (votesOption2 / totalVotes) * TWO_PI
  ] : [0, 0];

  // Smooth angle transitions using lerp for butter-smooth animation
  currentAngles[0] = lerp(currentAngles[0], targetAngles[0], 0.12);
  currentAngles[1] = lerp(currentAngles[1], targetAngles[1], 0.12);

  // Chart positioning
  let centerX = width / 2;
  let centerY = height / 2 - 50;
  let diameter = 200;

  // Smooth mouse-based offset for interactive parallax effect
  let targetOffsetX = map(mouseX, 0, width, -10, 10);
  let targetOffsetY = map(mouseY, 0, height, -10, 10);
  currentOffsetX = lerp(currentOffsetX, targetOffsetX, 0.08);
  currentOffsetY = lerp(currentOffsetY, targetOffsetY, 0.08);

  // Define colors for the two options
  let colors = [color(52, 152, 219), color(231, 76, 60)];  // Blue and Red

  // Draw pie chart segments with smooth animation
  if (totalVotes > 0) {
    let startAngle = 0;

    for (let i = 0; i < currentAngles.length; i++) {
      // Only draw if angle is significant
      if (currentAngles[i] > 0.01) {
        fill(colors[i]);
        noStroke();

        // Apply parallax offset - each segment shifts slightly different for depth
        let dynamicX = centerX + currentOffsetX * (i + 1) * 0.25;
        let dynamicY = centerY + currentOffsetY * (i + 1) * 0.25;

        // Draw the pie segment
        arc(dynamicX, dynamicY, diameter, diameter, startAngle, startAngle + currentAngles[i], PIE);

        // Add white border for clarity
        stroke(255);
        strokeWeight(2);
        noFill();
        arc(dynamicX, dynamicY, diameter, diameter, startAngle, startAngle + currentAngles[i], PIE);

        startAngle += currentAngles[i];
      }
    }
  } else {
    // Empty state - show placeholder
    stroke(200);
    strokeWeight(2);
    noFill();
    ellipse(centerX + currentOffsetX, centerY + currentOffsetY, diameter, diameter);
  }

  // Draw labels with smooth motion
  fill(50);
  textSize(16);
  textAlign(CENTER);
  noStroke();

  if (totalVotes > 0) {
    // Calculate and display percentages
    let percentage1 = (votesOption1 / totalVotes) * 100;
    let percentage2 = (votesOption2 / totalVotes) * 100;

    // Option 1 label
    fill(colors[0]);
    text(`🏠 Homeless: ${votesOption1} votes (${nf(percentage1, 1, 1)}%)`,
         centerX + currentOffsetX, centerY + diameter / 2 + 30 + currentOffsetY);

    // Option 2 label
    fill(colors[1]);
    text(`🔒 Prison: ${votesOption2} votes (${nf(percentage2, 1, 1)}%)`,
         centerX + currentOffsetX, centerY + diameter / 2 + 50 + currentOffsetY);

    // Question text at top
    fill(40);
    textSize(18);
    textStyle(BOLD);
    text("Would you rather be...", centerX, 30);
  } else {
    // No votes yet message
    fill(150);
    text("No votes yet! Cast the first vote below.",
         centerX + currentOffsetX, centerY + currentOffsetY);

    // Question text at top
    fill(40);
    textSize(18);
    textStyle(BOLD);
    text("Would you rather be...", centerX, 30);
  }
}
