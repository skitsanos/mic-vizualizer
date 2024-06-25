import {VisualizerFunction} from './core';

interface Particle
{
    x: number;
    y: number;
    radius: number;
    color: string;
}

const particles: Particle[] = [];

const visualizationParticles: VisualizerFunction = ({
                                                        ctx,
                                                        dataArray,
                                                        bufferLength,
                                                        canvas,
                                                        volume
                                                    }) =>
{
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Create or update particles
    while (particles.length < bufferLength / 4)
    {
        particles.push({
            x: centerX,
            y: centerY,
            radius: Math.random() * 5 + 2,
            color: `hsl(${Math.random() * 360}, 100%, 50%)`
        });
    }

    // Draw and update particles
    particles.forEach((particle, index) =>
    {
        const amplitude = ((dataArray[index * 4] - 128) / 128) * 50 * (1 + volume);
        const angle = (index / (bufferLength / 4)) * Math.PI * 2;

        particle.x += Math.cos(angle) * amplitude / 10;
        particle.y += Math.sin(angle) * amplitude / 10;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();

        // Reset particle if it's too far from the center
        if (Math.hypot(particle.x - centerX, particle.y - centerY) > Math.min(centerX, centerY))
        {
            particle.x = centerX;
            particle.y = centerY;
        }
    });
};

export default visualizationParticles;