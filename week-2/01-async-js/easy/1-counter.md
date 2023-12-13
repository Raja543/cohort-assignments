## Create a counter in JavaScript

We have already covered this in the second lesson, but as an easy recap try to code a counter in Javascript
It should go up as time goes by in intervals of 1 second

<script>

function updateCounter() {
  count++;
  document.getElementById("counter").innerText = count;
}
const intervalId = setInterval(updateCounter, 1000);

setTimeout(() => {
  clearInterval(intervalId);
  console.log("Counter stopped after 10 seconds.");
}, 10000);

</script>
