<?php
$unique_id = wp_unique_id( 'meal-list-' );
$meals_data = isset( $attributes['mealsData'] ) ? $attributes['mealsData'] : [];
?>

<div
	<?php echo get_block_wrapper_attributes(); ?>
	data-wp-interactive="create-block"
	data-wp-watch="store.meals"
>
	<ul id="<?php echo esc_attr( $unique_id ); ?>">
		<?php if ( ! empty( $meals_data ) ) : ?>
			<?php foreach ( $meals_data as $meal ) : ?>
				<div>
					<img src="<?php echo esc_html($meal['strMealThumb']) ?>" alt="<?php echo esc_html( $meal['strMeal'] ); ?>">
				<li><?php echo esc_html( $meal['strMeal'] ); ?></li>
				</div>
				
			<?php endforeach; ?>
		<?php else : ?>
			<li><?php esc_html_e( 'Loading meals...', 'swiggy-block-interactive-v1' ); ?></li>
		<?php endif; ?>
	</ul>
</div>
