document.addEventListener('DOMContentLoaded', () => {
    const photoGrids = document.querySelectorAll('.photoGrid');
    const congratsMessage = document.querySelector('.congratsMessage');
    let isDragging = false;

    // Initialize draggable on all grids
    $('.photoGrid').draggable({
        start: function() { 
            isDragging = true; 
        },
        stop: function() { 
            const $card = $(this);
            
            // Save the final inline position set by jQuery UI
            // Ensure this saves the actual CSS properties set by jQuery UI after drag.
            $card.attr('data-dragged-x', $card.css('left'));
            $card.attr('data-dragged-y', $card.css('top'));
            
            setTimeout(() => { isDragging = false; }, 0); 
        }
    });

    const deactivateAll = () => {
        const currentActive = document.querySelector('.photoGrid.active');
        
        if (currentActive) {
            // --- 1. GET AND RESTORE POSITION (Must happen FIRST) ---
            // Get the coordinates saved by the 'stop' handler
            const draggedX = currentActive.getAttribute('data-dragged-x') ;
            const draggedY = currentActive.getAttribute('data-dragged-y') ;
            
            //  --- RESTORE POSITION ONLY IF DRAGGED ---
            if (draggedX !== null && draggedY !== null && (draggedX !== '0px' || draggedY !== '0px')) {
                // Card WAS dragged. Restore its inline position.
                $(currentActive).css({

                    'left': draggedX,
                    'top': draggedY,
                });
                
                // Clean up the stored coordinates
                currentActive.removeAttribute('data-dragged-x');
                currentActive.removeAttribute('data-dragged-y');

            } else {
                // Card was NOT dragged (only clicked in default spot).
                // Clear any lingering inline styles so it snaps back to the grid/staggered CSS.
                $(currentActive).css({
                    'position': '', 
                    'left': '',
                    'top': '',
                    'transform': '' // Let the odd/even CSS rule handle the transform
                });
            }
            
            // --- 2. DEACTIVATE AND CLEANUP ---
            
            // This is the first and only time we remove the active class and enable drag.
            currentActive.classList.remove('active');
            $(currentActive).draggable('enable');
            
            // REMOVE THE PLACEHOLDER
            const placeholder = document.querySelector('.photo-grid-placeholder');
            if (placeholder) {
                placeholder.remove();
            }
        }
        
        // --- 3. GLOBAL CLEANUP ---
        photoGrids.forEach(g => g.classList.remove('blur-it'));
        if(congratsMessage){
            congratsMessage.classList.remove('blur-it');
        }
    };    

    photoGrids.forEach(grid => {
        grid.addEventListener('click', (event) => {
            setTimeout(() => {
            if (isDragging) {
                return;
            }
            event.stopPropagation();

            const isActive = grid.classList.contains('active');
            
            deactivateAll();

            if (!isActive) {
                // --- NEW LINE: CLEAR ANY INLINE DRAGGABLE STYLES ---
                grid.style.left = '';
                grid.style.top = '';
                // Activate clicked grid
                const placeholder = document.createElement('div');
                placeholder.classList.add('photoGrid', 'photo-grid-placeholder');
                placeholder.style.width = grid.offsetWidth + 'px';
                placeholder.style.height = grid.offsetHeight + 'px';
                placeholder.style.margin = window.getComputedStyle(grid).margin;
                
                grid.parentNode.insertBefore(placeholder, grid);
                grid.classList.add('active');
                
                // Disable draggable when active
                $(grid).draggable('disable');

                photoGrids.forEach(g => {
                    if (g !== grid) {
                        g.classList.add('blur-it');
                    }
                });
                if(congratsMessage){
                    congratsMessage.classList.add('blur-it');
                }
            }
            }, 50);
        });
    });

    document.addEventListener('click', () => {
        deactivateAll();
    });
});
