"use client";

import { useEffect, useState } from "react";

const MATRIX_LINES = [
    "Spring Security configured ✓",
    "JWT Auth enabled ✓",
    "Rate limiting active ✓",
    "Anti-scraping rules set ✓",
    "CORS policy enforced ✓",
    "SQL injection blocked ✓",
    "XSS protection on ✓",
    "CSRF disabled (stateless) ✓",
    "BCrypt password hashing ✓",
    "Request throttle: 100/min ✓",
];

function MatrixText() {
    const [visibleLines, setVisibleLines] = useState<string[]>([]);
    const [currentLine, setCurrentLine] = useState(0);
    const [currentChar, setCurrentChar] = useState(0);

    useEffect(() => {
        if (currentLine >= MATRIX_LINES.length) {
            // restart
            setTimeout(() => {
                setVisibleLines([]);
                setCurrentLine(0);
                setCurrentChar(0);
            }, 2000);
            return;
        }

        const line = MATRIX_LINES[currentLine];

        if (currentChar < line.length) {
            const t = setTimeout(() => {
                setVisibleLines((prev) => {
                    const updated = [...prev];
                    updated[currentLine] = line.slice(0, currentChar + 1);
                    return updated;
                });
                setCurrentChar((c) => c + 1);
            }, 40);
            return () => clearTimeout(t);
        } else {
            // move to next line
            const t = setTimeout(() => {
                setCurrentLine((l) => l + 1);
                setCurrentChar(0);
            }, 200);
            return () => clearTimeout(t);
        }
    }, [currentLine, currentChar]);

    return (
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden p-6">
            <div className="font-mono text-xs leading-6 w-full">
                {visibleLines.map((line, i) => (
                    <div key={i} className="flex items-center gap-2">
                        {/* green prompt */}
                        <span className="text-green-500 select-none">$</span>
                        {/* typed text */}
                        <span className="text-green-400">{line}</span>
                        {/* blinking cursor on active line */}
                        {i === currentLine && (
                            <span className="animate-pulse text-green-400">▋</span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MatrixText;