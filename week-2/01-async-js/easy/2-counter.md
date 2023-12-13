## Counter without setInterval

Without using setInterval, try to code a counter in Javascript. There is a hint at the bottom of the file if you get stuck.

<script>
    let count = 0;

    function updateCounter() {
      count++;
      document.getElementById('counter').innerText = count;
      setTimeout(updateCounter, 1000);
    }
    
    updateCounter();

 </script>

(Hint: setTimeout)
