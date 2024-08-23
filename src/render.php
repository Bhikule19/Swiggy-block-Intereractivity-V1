<?php
$unique_id = wp_unique_id('meal-list-');
$meals_data = isset($attributes['mealsData']) ? $attributes['mealsData'] : [];
$areas = isset($attributes['areas']) ? $attributes['areas'] : [];
?>

<div
    <?php echo get_block_wrapper_attributes(); ?>
    data-wp-interactive="create-block"
    data-wp-bind="effects.fetchMeals"
>
    <!-- Dropdown for selecting area -->
    <select id="area-select" data-wp-bind="state.selectedArea" data-wp-onchange="effects.fetchMeals">
        <?php foreach ($areas as $area): ?>
            <option value="<?php echo esc_attr($area); ?>">
                <?php echo esc_html($area); ?>
            </option>
        <?php endforeach; ?>
    </select>

    <!-- Meals list -->
    <ul id="<?php echo esc_attr($unique_id); ?>">
        <?php if (!empty($meals_data)) : ?>
            <?php foreach ($meals_data as $meal) : ?>
                <li>
                    <img src="<?php echo esc_html($meal['strMealThumb']); ?>" alt="<?php echo esc_html($meal['strMeal']); ?>">
                    <?php echo esc_html($meal['strMeal']); ?>
                </li>
            <?php endforeach; ?>
        <?php else : ?>
            <li><?php esc_html_e('Loading meals...', 'swiggy-block-interactive-v1'); ?></li>
        <?php endif; ?>
    </ul>
</div>
