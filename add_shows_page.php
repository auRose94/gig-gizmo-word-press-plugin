<?php 
	$performersQuery = new WP_Query(array(
   		'posts_per_page' => -1,
		'post_type' => 'performer'
	));
	$allPerformers = array();
	if($performersQuery->have_posts()) {
		$allPerformers = $performersQuery->posts;
	}

	function alphaCompare($a, $b)
	{
		if ($a->post_title == $b->post_title) {
			return 0;
		}
		return ($a->post_title < $b->post_title) ? -1 : 1;
	}
	usort($allPerformers, "alphaCompare");
	$nonce = wp_create_nonce( 'create_shows_nonce' ); 

?>

<div class="wrap">
	<h1 class="wp-heading-inline"><?php echo __("Create Show(s)"); ?></h1>
	<form 
		id="show-form" 
		action="<?php echo esc_url( admin_url('admin-post.php') ); ?>" 
		method="post">
		<input type="hidden" name="action" value="create_shows_post">
		<input type="hidden" name="create_shows_nonce" value="<?php echo $nonce ?>" />			

		<div class="form-group">
			<label for="performers"><?php echo __("Performer(s)"); ?></label>
			<select size="16" multiple class="form-control" name="performers[]" id="performers" required>
				<?php 
					for ($i = 0; $i < count($allPerformers); ++$i) {
						$item = $allPerformers[$i];
						?>
						<option value="<?php echo $item->ID; ?>">
							<?php echo $item->post_title?>
						</option>
						<?php
					}
				?>
			</select>
		</div>
		<div class="date-time form-group">
			<label for="date"><?php echo __("Date"); ?></label>
			<input name="date-1" id="date" type="date" required/>
			<label for="time-start"><?php echo __("Start Time"); ?></label>
			<input name="time-start-1" id="time-start" type="time" required/>
			<label for="time-stop"><?php echo __("Stop Time"); ?></label>
			<input name="time-stop-1" id="time-stop" type="time" required/>
			<button id="add-button" type="button" class="add-button btn btn-outline-primary btn-sm"><span class="add-icon dashicons dashicons-plus"></span></button>
			<button id="sub-button" type="button" class="sub-button btn btn-outline-primary btn-sm"><span class="sub-icon dashicons dashicons-minus"></span></button>
		</div>
		<button type="submit" class="btn btn-primary btn-lg"><?php echo __("Submit"); ?></button>
	</form>
</div>