import MicVisualizer from '@/components/MicVisualizer';
import {useState} from 'react';
import {VisualizationType} from '@/components/MicVisualizer/visualizers/core';

export default () =>
{
    const [visualizationType, setVisualizationType] = useState<VisualizationType>('bars');

    return <div className="App"
                style={{
                    width: '100vw',
                    height: '100vh'
                }}>
        <div className="flex flex-col items-center justify-center h-full">
            <MicVisualizer type={visualizationType}/>
            <select
                value={visualizationType}
                onChange={(e) => setVisualizationType(e.target.value as VisualizationType)}
                className="mt-4 p-2 rounded">
                <option value="bars">Bars</option>
                <option value="wave">Wave</option>
                <option value="spiral">Spiral</option>
                <option value="particles">Particles</option>
                <option value="frequencySpectrum">Frequency Spectrum</option>
                <option value="circularWaveform">Circular Waveform</option>
            </select>
        </div>
    </div>;
}