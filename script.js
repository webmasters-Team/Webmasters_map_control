var controls = $('#mapControls'),
    
    zoomStep = 10,
    zoom = $('#zoomSlider'),
    zoomOut = $('#zoomScale'),
    
    panStep = 10,
    totalPanX = 183,
    totalPanY = 107,
    panXOut = $('#posX'),
    panYOut = $('#posY'),
    
    debug = $('#debug');

controls.on('click', '.pan-arrow, .zoom-control', function(){
    switch ( $(this).attr('id') ) {
        case 'panTop':
            panMap(0, -panStep);
            break;
            
        case 'panRight':
            panMap(panStep, 0);
            break;
            
        case 'panBottom':
            panMap(0, panStep);
            break;
            
        case 'panLeft':
            panMap(-panStep, 0);
            break;
            
        case 'zoomIn':
            zoom.slider('value', zoom.slider('value') + zoomStep);
            updateZoom(zoom.slider('value'));
            break;
            
        case 'zoomOut':
            zoom.slider('value', zoom.slider('value') - zoomStep);
            updateZoom(zoom.slider('value'));
            break;
    }
});

zoom.slider({
    orientation:'vertical',
    range:'min',
    min:50,
    max:200,
    step:1,
    value:100,
    slide:function(e,ui) {
        updateZoom(ui.value);
    }
});

function updateZoom(rawZoom) {
    rawZoom /= 100;
    zoomOut.text( rawZoom );
    debug.css('-webkit-transform', 'scale(' + rawZoom + ')');
    debug.css('-moz-transform', 'scale(' + rawZoom + ')');
    debug.css('transform', 'scale(' + rawZoom + ')');
}

function panMap(panX, panY) {
    totalPanX += panX;
    if (totalPanX < 0) totalPanX = 0;
    totalPanY += panY;
    if (totalPanY < 0) totalPanY = 0;
    panXOut.text( totalPanX );
    panYOut.text( totalPanY );
    debug.css({top:totalPanY, left:totalPanX});
}