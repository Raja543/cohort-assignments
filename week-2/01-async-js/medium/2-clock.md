Using `1-counter.md` or `2-counter.md` from the easy section, can you create a
clock that shows you the current machine time?

Can you make it so that it updates every second, and shows time in the following formats -

- HH:MM::SS (Eg. 13:45:23)

- HH:MM::SS AM/PM (Eg 01:45:23 PM)

<script>
    function clock() {
  const currentdate = new Date();
  const hours = currentdate.getHours();
  const minutes = currentdate.getMinutes();
  const seconds = currentdate.getSeconds();
  return `${hours}:${minutes}:${seconds}`;
}

function padZero(number) {
  return number < 10 ? `0${number}` : number;
}

function upcurrentdatedClock() {
  const currentdate = new Date();
  const hours = currentdate.getHours() % 12 || 12;
  const minutes = padZero(currentdate.getMinutes());
  const seconds = padZero(currentdate.getSeconds());
  const ampm = currentdate.getHours() < 12 ? "AM" : "PM";
  return `${hours}:${minutes}:${seconds}:${ampm}`;
}

setInterval(() => {
  console.log(upcurrentdatedClock());
}, 1000);

console.log(clock());

console.log(upcurrentdatedClock());

<script>
