import { useEffect } from 'react';

const ScrollBackground = () => {
    useEffect(() => {
        const handleScroll = () => {
            // Calculate scroll progress based on total scrollable height
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = Math.min(Math.max(window.scrollY / totalHeight, 0), 1);

            // Define our gradient stops (colors)
            // We'll interpolate between these colors based on scroll position
            // 0%: Deep Blue/Purple (Start)
            // 50%: Rich Purple/Pink (Middle)
            // 100%: Deep Teal/Blue (End)

            let color1, color2;

            if (progress < 0.5) {
                // Transition from Start to Middle (0 -> 0.5 becomes 0 -> 1)
                const p = progress * 2;
                // Start: #0f0f23 (Deep Blue/Black) -> Middle: #2a1b3d (Deep Purple)
                color1 = interpolateColor('#0f0f23', '#2a1b3d', p);
                // Start: #1a1a2e (Dark Blue) -> Middle: #44318d (Purple)
                color2 = interpolateColor('#1a1a2e', '#44318d', p);
            } else {
                // Transition from Middle to End (0.5 -> 1 becomes 0 -> 1)
                const p = (progress - 0.5) * 2;
                // Middle: #2a1b3d -> End: #0f2027 (Deep Teal)
                color1 = interpolateColor('#2a1b3d', '#0f2027', p);
                // Middle: #44318d -> End: #203a43 (Teal)
                color2 = interpolateColor('#44318d', '#203a43', p);
            }

            // Apply the gradient to the body
            document.body.style.background = `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)`;
            document.body.style.backgroundAttachment = 'fixed';
            document.body.style.transition = 'background 0.1s ease-out';
        };

        // Helper function to interpolate between two hex colors
        const interpolateColor = (color1, color2, factor) => {
            const result = color1.slice(1).match(/.{2}/g).map((hex, i) => {
                return Math.round(
                    parseInt(hex, 16) * (1 - factor) + parseInt(color2.slice(1).match(/.{2}/g)[i], 16) * factor
                ).toString(16).padStart(2, '0');
            });
            return `#${result.join('')}`;
        };

        window.addEventListener('scroll', handleScroll);
        // Initial call to set background
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            // Reset background on unmount
            document.body.style.background = '';
            document.body.style.backgroundAttachment = '';
            document.body.style.transition = '';
        };
    }, []);

    return null; // This component doesn't render anything visible directly
};

export default ScrollBackground;
