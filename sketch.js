// Voting data
let votesOption1 = 0;
let votesOption2 = 0;

// Smooth animation variables
let currentAngles = [0, 0];
let targetAngles = [0, 0];
let currentOffsetX = 0;
let currentOffsetY = 0;
let targetOffsetX = 0;
let targetOffsetY = 0;

// Smooth percentage display
let displayPercentage1 = 0;
let displayPercentage2 = 0;

// UI elements
let button1, button2;

// Animation settings
const LERP_SPEED = 0.15;
const HOVER_AMPLITUDE = 8;

function setup() {
  let canvas = createCanvas(600, 500);
  canvas.parent('canvas-container');

  // Create stylish buttons
  button1 = createButton('🏠 Be Homeless');
  button1.position(windowWidth / 2 - 250, 450);
  button1.class('vote-button option1');
  button1.mousePressed(() => voteFor(1));

  button2 = createButton('🔒 Be in Prison');
  button2.position(windowWidth / 2 + 50, 450);
  button2.class('vote-button option2');
  button2.mousePressed(() => voteFor(2));
}

function draw() {
  background(250, 250, 255);

  // Calculate target values
  let totalVotes = votesOption1 + votesOption2;

  if (totalVotes > 0) {
    targetAngles[0] = (votesOption1 / totalVotes) * TWO_PI;
    targetAngles[1] = (votesOption2 / totalVotes) * TWO_PI;

    // Smooth percentage transitions
    let targetPercentage1 = (votesOption1 / totalVotes) * 100;
    let targetPercentage2 = (votesOption2 / totalVotes) * 100;
    displayPercentage1 = lerp(displayPercentage1, targetPercentage1, LERP_SPEED);
    displayPercentage2 = lerp(displayPercentage2, targetPercentage2, LERP_SPEED);
  } else {
    targetAngles = [0, 0];
    displayPercentage1 = 0;
    displayPercentage2 = 0;
  }

  // Smooth angle transitions
  currentAngles[0] = lerp(currentAngles[0], targetAngles[0], LERP_SPEED);
  currentAngles[1] = lerp(currentAngles[1], targetAngles[1], LERP_SPEED);

  // Smooth mouse-based offset
  targetOffsetX = map(mouseX, 0, width, -HOVER_AMPLITUDE, HOVER_AMPLITUDE);
  targetOffsetY = map(mouseY, 0, height, -HOVER_AMPLITUDE, HOVER_AMPLITUDE);
  currentOffsetX = lerp(currentOffsetX, targetOffsetX, 0.1);
  currentOffsetY = lerp(currentOffsetY, targetOffsetY, 0.1);

  // Draw the visualization
  drawPieChart();
  drawStats();
}

function drawPieChart() {
  let centerX = width / 2;
  let centerY = height / 2 - 30;
  let diameter = 280;

  let totalVotes = votesOption1 + votesOption2;

  if (totalVotes === 0) {
    // Empty state
    drawEmptyState(centerX, centerY, diameter);
    return;
  }

  // Colors
  let color1 = color(52, 152, 219); // Blue
  let color2 = color(231, 76, 60);  // Red

  // Draw shadow
  noStroke();
  fill(0, 0, 0, 20);
  ellipse(centerX + 4, centerY + 8, diameter + 10, diameter + 10);

  // Draw pie segments with smooth animation
  let startAngle = -HALF_PI; // Start from top

  // Segment 1 - Homeless
  if (currentAngles[0] > 0.01) {
    push();
    translate(currentOffsetX * 0.3, currentOffsetY * 0.3);

    // Highlight on hover
    if (isHoveringSegment(centerX, centerY, diameter, startAngle, currentAngles[0])) {
      fill(red(color1) + 30, green(color1) + 30, blue(color1) + 30);
      drawSegment(centerX, centerY, diameter + 10, startAngle, currentAngles[0]);
    }

    fill(color1);
    drawSegment(centerX, centerY, diameter, startAngle, currentAngles[0]);

    // Draw stroke
    stroke(255);
    strokeWeight(3);
    noFill();
    drawSegment(centerX, centerY, diameter, startAngle, currentAngles[0]);

    pop();
    startAngle += currentAngles[0];
  }

  // Segment 2 - Prison
  if (currentAngles[1] > 0.01) {
    push();
    translate(currentOffsetX * 0.5, currentOffsetY * 0.5);

    // Highlight on hover
    if (isHoveringSegment(centerX, centerY, diameter, startAngle, currentAngles[1])) {
      fill(red(color2) + 30, green(color2) + 30, blue(color2) + 30);
      drawSegment(centerX, centerY, diameter + 10, startAngle, currentAngles[1]);
    }

    fill(color2);
    drawSegment(centerX, centerY, diameter, startAngle, currentAngles[1]);

    // Draw stroke
    stroke(255);
    strokeWeight(3);
    noFill();
    drawSegment(centerX, centerY, diameter, startAngle, currentAngles[1]);

    pop();
  }

  // Center circle for donut effect
  fill(250, 250, 255);
  noStroke();
  ellipse(centerX, centerY, diameter * 0.5, diameter * 0.5);

  // Center text
  fill(40);
  textAlign(CENTER, CENTER);
  textSize(18);
  textStyle(BOLD);
  text('Total Votes', centerX, centerY - 15);
  textSize(32);
  text(totalVotes, centerX, centerY + 15);
}

function drawSegment(x, y, d, startAngle, angle) {
  arc(x, y, d, d, startAngle, startAngle + angle, PIE);
}

function drawEmptyState(x, y, d) {
  // Dashed circle
  stroke(150);
  strokeWeight(3);
  noFill();
  drawingContext.setLineDash([10, 10]);
  ellipse(x, y, d, d);
  drawingContext.setLineDash([]);

  // Text
  fill(120);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(20);
  text('No votes yet!', x, y - 10);
  textSize(14);
  text('Cast the first vote', x, y + 15);
}

function drawStats() {
  let totalVotes = votesOption1 + votesOption2;

  if (totalVotes === 0) return;

  // Stats panel
  let panelY = height - 130;

  // Option 1 stats
  fill(52, 152, 219, 200);
  noStroke();
  rect(50, panelY, 220, 80, 10);

  fill(255);
  textAlign(LEFT, TOP);
  textSize(16);
  textStyle(BOLD);
  text('🏠 Be Homeless', 65, panelY + 15);

  textSize(28);
  text(nf(displayPercentage1, 1, 1) + '%', 65, panelY + 40);

  textSize(14);
  textStyle(NORMAL);
  text(votesOption1 + ' votes', 180, panelY + 48);

  // Option 2 stats
  fill(231, 76, 60, 200);
  rect(330, panelY, 220, 80, 10);

  fill(255);
  textAlign(LEFT, TOP);
  textSize(16);
  textStyle(BOLD);
  text('🔒 Be in Prison', 345, panelY + 15);

  textSize(28);
  text(nf(displayPercentage2, 1, 1) + '%', 345, panelY + 40);

  textSize(14);
  textStyle(NORMAL);
  text(votesOption2 + ' votes', 460, panelY + 48);
}

function isHoveringSegment(centerX, centerY, diameter, startAngle, angle) {
  let d = dist(mouseX, mouseY, centerX, centerY);
  if (d > diameter / 2) return false;

  let mouseAngle = atan2(mouseY - centerY, mouseX - centerX);
  if (mouseAngle < 0) mouseAngle += TWO_PI;

  let normalizedStart = startAngle;
  if (normalizedStart < 0) normalizedStart += TWO_PI;

  let endAngle = normalizedStart + angle;

  return mouseAngle >= normalizedStart && mouseAngle <= endAngle;
}

function voteFor(option) {
  if (option === 1) {
    votesOption1++;
    animateButton(button1);
  } else {
    votesOption2++;
    animateButton(button2);
  }
}

function animateButton(button) {
  button.addClass('clicked');
  setTimeout(() => button.removeClass('clicked'), 200);
}

function windowResized() {
  // Reposition buttons on window resize
  button1.position(windowWidth / 2 - 250, 450);
  button2.position(windowWidth / 2 + 50, 450);
}
