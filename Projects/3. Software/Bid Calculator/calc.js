$(document).ready(function() {
    $('#bidForm').on('submit', function(event) {
        event.preventDefault();

        // Fixed variables
        const wage = 30;  // dollars an hour
        const avg_per_ft = 10; // dollars per square foot
        const sqft_perday = 150; // square foot a day within 8 hour shift by one worker
        const d_per_gallon = 5.45; // dollars per gallon
        const mpg = 15.5; 
        const profit_margin = 1.35;
        
        // Input values from the form
        const square_ft = parseFloat($('#square_ft').val());
        const distance = parseFloat($('#distance').val());
        const number_wrkrs = parseInt($('#number_wrkrs').val());
        const additional_sqrft = parseFloat($('#additional_sqrft').val()) || 0;

        // Output values
        const num_days = Math.ceil(square_ft / sqft_perday / number_wrkrs);
        $('#num_days').text(`This job will take ${num_days} days to complete`);

        const total = (square_ft / sqft_perday * 8 * wage) + (square_ft * avg_per_ft) + (distance / mpg * d_per_gallon * 2) + (num_days * 100);
        const bid_price = total * profit_margin;
        $('#bid_price').text(`The recommended bid price for this job is $${bid_price.toFixed(2)}`);

        const sqr_ft_price = bid_price / square_ft;
        $('#price_per_sqft').text(`The price per square foot is $${sqr_ft_price.toFixed(2)}`);

        const additional_cost = sqr_ft_price * additional_sqrft;
        const grand_total = bid_price + additional_cost;
        $('#grand_total').text(`Grand total: $${grand_total.toFixed(2)}`);
    });
});
