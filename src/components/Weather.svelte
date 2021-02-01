<script>
    import { fahrenheitToCelsius, celsiusToFahrenheit } from 'temperature';

    export let icon, description, city, temperature, unit;

    let temp;
    let displayTemp;

    $: {
        temp =
            unit.toLowerCase() === 'c'
                ? fahrenheitToCelsius(temperature)
                : celsiusToFahrenheit(temperature);
        displayTemp = `${Math.floor(temp)} &deg; ${unit.toUpperCase()}`;
    }
</script>

<figure><img alt="partly cloudy" src="/icons/{icon}.png" /></figure>
<h3>{city}</h3>
<h1>
    {@html displayTemp}
</h1>
<p>{description}</p>
