const GRAPHS = [
    {
        id: 'exp',
        label: 'y = aˣ',
        draw: (ctx, W, H) => {
            const ox = W * 0.28, oy = H * 0.78, sx = 42, sy = 42;
            drawAxes(ctx, W, H, ox, oy);

            drawCurve(ctx, '#b8f050', W, px => {
                const x = (px - ox) / sx;
                const py = oy - Math.pow(2, x) * sy;
                return (py < -10 || py > H + 10) ? null : py;
            });

            drawCurve(ctx, '#7060f8', W, px => {
                const x = (px - ox) / sx;
                const py = oy - Math.pow(0.5, x) * sy;
                return (py < -10 || py > H + 10) ? null : py;
            });

            // точка (0,1) — оба графика проходят через неё
            drawDot(ctx, ox, oy - sy, '#eeeef8');
            drawLabel(ctx, ox + 5, oy - sy - 4, '1', '#eeeef8');

            // x=-1: a^-1 = 1/a
            drawLabel(ctx, ox - sx - 4, oy + 14, '-1', '#6868a0');
            drawLabel(ctx, ox + sx - 4, oy + 14, '1', '#6868a0');

            drawLabel(ctx, ox + 2.2*sx, oy - 3.5*sy, 'a>1', '#b8f050');
            drawLabel(ctx, ox + 2.2*sx, oy - 0.2*sy, '0<a<1', '#7060f8');

            labelXTicks(ctx, ox, oy, sx, [-2, -1, 1, 2]);
            labelYTicks(ctx, ox, oy, sy, [1, 2, 3]);
            axisLabels(ctx, W, H, ox, oy);
        }
    },
    {
        id: 'log',
        label: 'y = logₐx',
        draw: (ctx, W, H) => {
            const ox = W * 0.18, oy = H * 0.5, sx = 48, sy = 45;
            drawAxes(ctx, W, H, ox, oy);

            drawCurveRange(ctx, '#b8f050', W, ox, sx, 0.01, 99, x => {
                const py = oy - Math.log2(x) * sy;
                return (py < -10 || py > H + 10) ? null : py;
            });

            drawCurveRange(ctx, '#7060f8', W, ox, sx, 0.01, 99, x => {
                const py = oy - (Math.log(x) / Math.log(0.5)) * sy;
                return (py < -10 || py > H + 10) ? null : py;
            });

            // точка (1,0) — оба проходят
            drawDot(ctx, ox + sx, oy, '#eeeef8');
            drawLabel(ctx, ox + sx + 4, oy + 14, '1', '#eeeef8');

            drawLabel(ctx, ox + 3.2*sx, oy - 1.8*sy, 'a>1', '#b8f050');
            drawLabel(ctx, ox + 3.2*sx, oy + 1.4*sy, '0<a<1', '#7060f8');

            labelXTicks(ctx, ox, oy, sx, [1, 2, 3, 4]);
            labelYTicks(ctx, ox, oy, sy, [-2, -1, 1, 2]);
            axisLabels(ctx, W, H, ox, oy);
        }
    },
    {
        id: 'sin',
        label: 'y = sin x',
        draw: (ctx, W, H) => {
            const ox = W * 0.5, oy = H * 0.5, sx = 46, sy = 62;
            drawAxes(ctx, W, H, ox, oy);

            drawCurve(ctx, '#b8f050', W, px => oy - Math.sin((px - ox) / sx) * sy);

            // y=1 при x=π/2
            drawDot(ctx, ox + Math.PI/2*sx, oy - sy, '#eeeef8');
            drawLabel(ctx, ox + 6, oy - sy - 4, '1', '#eeeef8');
            // y=-1 при x=-π/2
            drawDot(ctx, ox - Math.PI/2*sx, oy + sy, '#eeeef8');
            drawLabel(ctx, ox + 6, oy + sy + 4, '-1', '#eeeef8');

            drawPiTicks(ctx, ox, oy, sx, [
                [0.5, 'π/2'], [1, 'π'], [-0.5, '-π/2'], [-1, '-π'], [2, '2π'], [-2, '-2π']
            ]);
            axisLabels(ctx, W, H, ox, oy);
        }
    },
    {
        id: 'cos',
        label: 'y = cos x',
        draw: (ctx, W, H) => {
            const ox = W * 0.5, oy = H * 0.5, sx = 46, sy = 62;
            drawAxes(ctx, W, H, ox, oy);

            drawCurve(ctx, '#b8f050', W, px => oy - Math.cos((px - ox) / sx) * sy);

            // y=1 при x=0
            drawDot(ctx, ox, oy - sy, '#eeeef8');
            drawLabel(ctx, ox + 6, oy - sy - 4, '1', '#eeeef8');
            // y=-1 при x=π
            drawDot(ctx, ox + Math.PI*sx, oy + sy, '#eeeef8');
            drawLabel(ctx, ox + 6, oy + sy + 4, '-1', '#eeeef8');

            drawPiTicks(ctx, ox, oy, sx, [
                [0.5, 'π/2'], [1, 'π'], [-0.5, '-π/2'], [-1, '-π'], [2, '2π'], [-2, '-2π']
            ]);
            axisLabels(ctx, W, H, ox, oy);
        }
    },
    {
        id: 'arccos',
        label: 'y = arccos x',
        draw: (ctx, W, H) => {
            const ox = W * 0.5, oy = H * 0.72, sx = 85, sy = 58;
            drawAxes(ctx, W, H, ox, oy);

            drawCurveRange(ctx, '#b8f050', W, ox, sx, -1, 1, x => oy - Math.acos(x) * sy);

            // ключевые точки
            drawDot(ctx, ox - sx, oy - Math.PI*sy, '#eeeef8');      // (-1, π)
            drawDot(ctx, ox, oy - Math.PI/2*sy, '#eeeef8');          // (0, π/2)
            drawDot(ctx, ox + sx, oy, '#eeeef8');                     // (1, 0)

            drawLabel(ctx, ox - sx - 6, oy + 14, '-1', '#eeeef8');
            drawLabel(ctx, ox + sx - 4, oy + 14, '1', '#eeeef8');

            drawLabel(ctx, ox + 6, oy - Math.PI*sy + 4, 'π', '#eeeef8');
            drawLabel(ctx, ox + 6, oy - Math.PI/2*sy + 4, 'π/2', '#eeeef8');

            axisLabels(ctx, W, H, ox, oy);
        }
    },
    {
        id: 'arcsin',
        label: 'y = arcsin x',
        draw: (ctx, W, H) => {
            const ox = W * 0.5, oy = H * 0.5, sx = 85, sy = 58;
            drawAxes(ctx, W, H, ox, oy);

            drawCurveRange(ctx, '#b8f050', W, ox, sx, -1, 1, x => oy - Math.asin(x) * sy);

            drawDot(ctx, ox - sx, oy + Math.PI/2*sy, '#eeeef8');   // (-1, -π/2)
            drawDot(ctx, ox + sx, oy - Math.PI/2*sy, '#eeeef8');   // (1, π/2)

            drawLabel(ctx, ox - sx - 6, oy + 14, '-1', '#eeeef8');
            drawLabel(ctx, ox + sx - 4, oy + 14, '1', '#eeeef8');

            drawLabel(ctx, ox + 6, oy - Math.PI/2*sy + 4, 'π/2', '#eeeef8');
            drawLabel(ctx, ox + 6, oy + Math.PI/2*sy - 10, '-π/2', '#eeeef8');

            axisLabels(ctx, W, H, ox, oy);
        }
    },
    {
        id: 'tan',
        label: 'y = tg x',
        draw: (ctx, W, H) => {
            const ox = W * 0.5, oy = H * 0.5, sx = 57, sy = 42;
            drawAxes(ctx, W, H, ox, oy);

            // асимптоты
            ctx.strokeStyle = '#3a3a5a';
            ctx.lineWidth = 1;
            ctx.setLineDash([4, 4]);
            [-1, 1].forEach(k => {
                const px = ox + k * Math.PI/2 * sx;
                ctx.beginPath(); ctx.moveTo(px, 0); ctx.lineTo(px, H); ctx.stroke();
            });
            ctx.setLineDash([]);

            [[-Math.PI*1.4, -Math.PI/2-0.05], [-Math.PI/2+0.05, Math.PI/2-0.05], [Math.PI/2+0.05, Math.PI*1.4]].forEach(([xmin, xmax]) => {
                drawCurveRange(ctx, '#b8f050', W, ox, sx, xmin, xmax, x => {
                    const y = Math.tan(x);
                    return Math.abs(y) > 6 ? null : oy - y * sy;
                });
            });

            // подпись асимптот
            drawLabel(ctx, ox + Math.PI/2*sx + 3, 14, 'π/2', '#3a3a5a');
            drawLabel(ctx, ox - Math.PI/2*sx - 22, 14, '-π/2', '#3a3a5a');

            labelYTicks(ctx, ox, oy, sy, [-2, -1, 1, 2]);
            drawPiTicks(ctx, ox, oy, sx, [
                [1, 'π'], [-1, '-π']
            ]);
            axisLabels(ctx, W, H, ox, oy);
        }
    },
    {
        id: 'cot',
        label: 'y = ctg x',
        draw: (ctx, W, H) => {
            const ox = W * 0.5, oy = H * 0.5, sx = 57, sy = 42;
            drawAxes(ctx, W, H, ox, oy);

            ctx.strokeStyle = '#3a3a5a';
            ctx.lineWidth = 1;
            ctx.setLineDash([4, 4]);
            [-1, 0, 1].forEach(k => {
                const px = ox + k * Math.PI * sx;
                ctx.beginPath(); ctx.moveTo(px, 0); ctx.lineTo(px, H); ctx.stroke();
            });
            ctx.setLineDash([]);

            [[-Math.PI*1.4, -0.05], [0.05, Math.PI-0.05], [Math.PI+0.05, Math.PI*1.4]].forEach(([xmin, xmax]) => {
                drawCurveRange(ctx, '#b8f050', W, ox, sx, xmin, xmax, x => {
                    const y = Math.cos(x) / Math.sin(x);
                    return Math.abs(y) > 6 ? null : oy - y * sy;
                });
            });

            // подписи асимптот
            drawLabel(ctx, ox + 3, 14, '0', '#3a3a5a');
            drawLabel(ctx, ox + Math.PI*sx + 3, 14, 'π', '#3a3a5a');
            drawLabel(ctx, ox - Math.PI*sx - 16, 14, '-π', '#3a3a5a');

            // π/2 отметка
            drawPiTicks(ctx, ox, oy, sx, [[0.5, 'π/2'], [-0.5, '-π/2']]);
            labelYTicks(ctx, ox, oy, sy, [-2, -1, 1, 2]);
            axisLabels(ctx, W, H, ox, oy);
        }
    },
    {
        id: 'arctan',
        label: 'y = arctg x',
        draw: (ctx, W, H) => {
            const ox = W * 0.5, oy = H * 0.5, sx = 38, sy = 72;
            drawAxes(ctx, W, H, ox, oy);

            ctx.strokeStyle = '#3a3a5a';
            ctx.lineWidth = 1;
            ctx.setLineDash([4, 4]);
            [1, -1].forEach(k => {
                const py = oy - k * Math.PI/2 * sy;
                ctx.beginPath(); ctx.moveTo(0, py); ctx.lineTo(W, py); ctx.stroke();
            });
            ctx.setLineDash([]);

            drawCurve(ctx, '#b8f050', W, px => oy - Math.atan((px - ox) / sx) * sy);

            // точки (1, π/4) и (-1, -π/4)
            drawDot(ctx, ox + sx, oy - Math.PI/4*sy, '#eeeef8');
            drawDot(ctx, ox - sx, oy + Math.PI/4*sy, '#eeeef8');

            labelXTicks(ctx, ox, oy, sx, [-3, -2, -1, 1, 2, 3]);

            drawLabel(ctx, ox + 6, oy - Math.PI/2*sy + 4, 'π/2', '#eeeef8');
            drawLabel(ctx, ox + 6, oy + Math.PI/2*sy - 10, '-π/2', '#eeeef8');
            drawLabel(ctx, ox + 6, oy - Math.PI/4*sy + 4, 'π/4', '#6868a0');
            drawLabel(ctx, ox + 6, oy + Math.PI/4*sy - 10, '-π/4', '#6868a0');

            axisLabels(ctx, W, H, ox, oy);
        }
    },
    {
        id: 'arccot',
        label: 'y = arcctg x',
        draw: (ctx, W, H) => {
            const ox = W * 0.5, oy = H * 0.72, sx = 38, sy = 72;
            drawAxes(ctx, W, H, ox, oy);

            ctx.strokeStyle = '#3a3a5a';
            ctx.lineWidth = 1;
            ctx.setLineDash([4, 4]);
            [0, Math.PI].forEach(v => {
                const py = oy - v * sy;
                ctx.beginPath(); ctx.moveTo(0, py); ctx.lineTo(W, py); ctx.stroke();
            });
            ctx.setLineDash([]);

            drawCurve(ctx, '#b8f050', W, px => oy - (Math.PI/2 - Math.atan((px - ox) / sx)) * sy);

            drawDot(ctx, ox + sx, oy - Math.PI/4*sy, '#eeeef8');
            drawDot(ctx, ox - sx, oy - 3*Math.PI/4*sy, '#eeeef8');

            labelXTicks(ctx, ox, oy, sx, [-3, -2, -1, 1, 2, 3]);

            drawLabel(ctx, ox + 6, oy - Math.PI*sy + 4, 'π', '#eeeef8');
            drawLabel(ctx, ox + 6, oy - Math.PI/2*sy + 4, 'π/2', '#eeeef8');
            drawLabel(ctx, ox + 6, oy - Math.PI/4*sy + 4, 'π/4', '#6868a0');
            drawLabel(ctx, ox + 6, oy - 3*Math.PI/4*sy + 4, '3π/4', '#6868a0');

            axisLabels(ctx, W, H, ox, oy);
        }
    },
    {
        id: 'power',
        label: 'y = xᵃ',
        draw: (ctx, W, H) => {
            const ox = W * 0.22, oy = H * 0.80, sx = 55, sy = 55;
            drawAxes(ctx, W, H, ox, oy);

            const cases = [
                { a: 2,    label: 'a>1',   color: '#b8f050', lx: 1.3,  ly: -3.0 },
                { a: 1,    label: 'a=1',   color: '#60c8f8', lx: 2.2,  ly: -2.3 },
                { a: 0.5,  label: '0<a<1', color: '#7060f8', lx: 2.8,  ly: -1.5 },
                { a: 0,    label: 'a=0',   color: '#f8c060', lx: 2.8,  ly: -0.2 },
                { a: -1,   label: 'a<0',   color: '#f06060', lx: 0.2,  ly: -3.0 },
            ];

            cases.forEach(({a, label, color, lx, ly}) => {
                if (a === 0) {
                    // y=1 для x>0
                    ctx.strokeStyle = color;
                    ctx.lineWidth = 2.5;
                    ctx.beginPath();
                    ctx.moveTo(ox, oy - sy);
                    ctx.lineTo(W, oy - sy);
                    ctx.stroke();
                    // открытая точка в x=0
                    ctx.strokeStyle = color;
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.arc(ox, oy - sy, 4, 0, Math.PI * 2);
                    ctx.stroke();
                } else {
                    drawCurveRange(ctx, color, W, ox, sx, a < 0 ? 0.05 : 0, 5, x => {
                        const y = Math.pow(x, a);
                        if (!isFinite(y) || y > 5.5 || y < -1) return null;
                        return oy - y * sy;
                    });
                }
                drawLabel(ctx, ox + lx*sx, oy + ly*sy, label, color);
            });

            // точка (1,1)
            drawDot(ctx, ox + sx, oy - sy, '#eeeef8');
            drawLabel(ctx, ox + sx + 4, oy - sy - 5, '(1,1)', '#eeeef8');

            labelXTicks(ctx, ox, oy, sx, [1, 2, 3]);
            labelYTicks(ctx, ox, oy, sy, [1, 2, 3]);
            axisLabels(ctx, W, H, ox, oy);
        }
    }
];

// ─── helpers ────────────────────────────────────────────────────

function drawAxes(ctx, W, H, ox, oy) {
    ctx.strokeStyle = '#6868a0';
    ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(0, oy); ctx.lineTo(W - 10, oy); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(ox, H); ctx.lineTo(ox, 10); ctx.stroke();
    ctx.fillStyle = '#6868a0';
    ctx.beginPath(); ctx.moveTo(W-12, oy-5); ctx.lineTo(W, oy); ctx.lineTo(W-12, oy+5); ctx.fill();
    ctx.beginPath(); ctx.moveTo(ox-5, 12); ctx.lineTo(ox, 0); ctx.lineTo(ox+5, 12); ctx.fill();
}

function axisLabels(ctx, W, H, ox, oy) {
    ctx.fillStyle = '#6868a0';
    ctx.font = '13px DM Mono, monospace';
    ctx.fillText('x', W - 14, oy - 8);
    ctx.fillText('y', ox + 8, 14);
}

function drawCurve(ctx, color, W, fn) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    let first = true;
    for (let px = 0; px <= W; px++) {
        const py = fn(px);
        if (py === null) { first = true; continue; }
        first ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
        first = false;
    }
    ctx.stroke();
}

function drawCurveRange(ctx, color, W, ox, sx, xmin, xmax, fn) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    let first = true;
    for (let px = 0; px <= W; px++) {
        const x = (px - ox) / sx;
        if (x < xmin || x > xmax) { first = true; continue; }
        const py = fn(x);
        if (py === null) { first = true; continue; }
        first ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
        first = false;
    }
    ctx.stroke();
}

function drawDot(ctx, px, py, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(px, py, 3.5, 0, Math.PI * 2);
    ctx.fill();
}

function drawLabel(ctx, x, y, text, color) {
    ctx.fillStyle = color;
    ctx.font = '11px DM Mono, monospace';
    ctx.fillText(text, x, y);
}

function labelXTicks(ctx, ox, oy, sx, vals) {
    ctx.fillStyle = '#6868a0';
    ctx.font = '11px DM Mono, monospace';
    ctx.strokeStyle = '#6868a0';
    ctx.lineWidth = 1;
    vals.forEach(v => {
        const px = ox + v * sx;
        ctx.beginPath(); ctx.moveTo(px, oy - 3); ctx.lineTo(px, oy + 3); ctx.stroke();
        const label = String(v);
        ctx.fillText(label, px - label.length * 3, oy + 14);
    });
}

function labelYTicks(ctx, ox, oy, sy, vals) {
    ctx.fillStyle = '#6868a0';
    ctx.font = '11px DM Mono, monospace';
    ctx.strokeStyle = '#6868a0';
    ctx.lineWidth = 1;
    vals.forEach(v => {
        const py = oy - v * sy;
        ctx.beginPath(); ctx.moveTo(ox - 3, py); ctx.lineTo(ox + 3, py); ctx.stroke();
        ctx.fillText(String(v), ox + 6, py + 4);
    });
}

function drawPiTicks(ctx, ox, oy, sx, ticks) {
    ctx.fillStyle = '#6868a0';
    ctx.font = '11px DM Mono, monospace';
    ctx.strokeStyle = '#6868a0';
    ctx.lineWidth = 1;
    ticks.forEach(([k, label]) => {
        const px = ox + k * Math.PI * sx;
        ctx.beginPath(); ctx.moveTo(px, oy - 3); ctx.lineTo(px, oy + 3); ctx.stroke();
        ctx.fillText(label, px - label.length * 3, oy + 14);
    });
}

function renderGraph(canvasId, graphObj) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#14141a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    graphObj.draw(ctx, canvas.width, canvas.height);
}

function initGraphCard(cardId) {
    const card = document.getElementById(cardId);
    if (!card) return;

    let currentGraph = GRAPHS[0];
    const canvasId = 'graph-canvas-' + cardId;
    const sheetId = 'graph-sheet-' + cardId;

    setTimeout(() => renderGraph(canvasId, currentGraph), 60);

    card.querySelector('.graph-burger').addEventListener('click', () => {
        card.querySelector('.graph-overlay').style.display = 'block';
        document.getElementById(sheetId).classList.add('open');
    });

    card.querySelector('.graph-overlay').addEventListener('click', () => {
        card.querySelector('.graph-overlay').style.display = 'none';
        document.getElementById(sheetId).classList.remove('open');
    });

    card.querySelectorAll('.graph-item').forEach(item => {
        item.addEventListener('click', () => {
            const id = item.dataset.graph;
            currentGraph = GRAPHS.find(g => g.id === id);
            card.querySelector('.graph-current-label').textContent = currentGraph.label;
            renderGraph(canvasId, currentGraph);
            card.querySelector('.graph-overlay').style.display = 'none';
            document.getElementById(sheetId).classList.remove('open');
            card.querySelectorAll('.graph-item').forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
    });
}