<script>
    import { fahrenheitToCelsius, celsiusToFahrenheit } from 'temperature';
    import { temperatureUnits } from '../lib/constants';
    import { store } from '../store';

    export let icon, description, city, temperature, baseUnits;

    let temp;
    let displayTemp;
    let unitType;

    function convertTemperature(unitType) {
        if (baseUnits === unitType) {
            return temperature;
        }

        return unitType === temperatureUnits.metric
            ? fahrenheitToCelsius(temperature)
            : celsiusToFahrenheit(temperature);
    }

    $: {
        unitType = $store.units;
        temp = convertTemperature(unitType);
        displayTemp = `${Math.floor(temp)} &deg; ${temperatureUnits[
            unitType
        ].display.toUpperCase()}`;
    }
</script>

{#if temperature}
    <figure><img alt="partly cloudy" src="/icons/{icon}.png" /></figure>
    <h3>{city}</h3>
    <h1>
        {@html displayTemp}
    </h1>
    <p>{description}</p>
{/if}
