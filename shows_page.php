<?php
	$show_table = get_show_table();
	$nonce = wp_create_nonce( 'remove_shows_nonce' );
	//echo json_encode($show_table);
?>
<div class="wrap">
	<form
		id="remove-shows-form"
		action="<?php echo esc_url( admin_url('admin-post.php') ); ?>"
		method="post">
		<input type="hidden" name="action" value="remove_shows_post">
		<input type="hidden" name="remove_shows_nonce" value="<?php echo $nonce ?>" />
	<div>
		<h1 class="wp-heading-inline"><?php echo __("All shows"); ?></h1>
		<a role="button" class="btn btn-outline-success" href="<?php echo admin_url('admin.php?page=add_shows_page'); ?>">Add New</a>
		<button type="submit" class="btn btn-outline-success"><?php echo __("Remove Selected"); ?></button>
		<br/>
		<em>Displays all future performer show times.</em>
	</div>

		<div class="table-responsive-sm">
			<table class="table table-hover table-sm">
				<thead class="thead-dark">
					<tr>
						<th scope="col">Selected</th>
						<th scope="col">Start</th>
						<th scope="col">Stop</th>
						<th scope="col">Performing</th>
					</tr>
				</thead>
				<tbody>
					<?php
						for ($i = 0; $i < count($show_table); ++$i) {
							$entry = $show_table[$i];
							$format = "F jS Y - g:ia";
							?>
							<tr>
								<th>
									<input value="<?php echo $i; ?>" type="checkbox" name="selected[]" id="item-selected-<?php echo $i; ?>">
								</th>
								<th><?php
								$startTime = new DateTime($entry["startTime"]);
								echo $startTime->format($format);
								?></th>
								<th><?php
								$startTime = new DateTime($entry["stopTime"]);
								echo $startTime->format($format);
								?></th>
								<th>
									<?php
										$performers = $entry["performers"];
										for($ci = 0; $ci < count($performers); ++$ci) {
											$performer = get_post($performers[$ci]);
											if($performer) {
												?>
													<a
														href="<?php echo get_post_permalink($performer) ?>"><?php echo $performer->post_title; ?></a><?php
														if(count($performers) - 1 > $ci) {
															echo ",";
														}?><?php
											}
										}
									?>
								</th>
							</tr>
							<?php
						}
					?>
				</tbody>
			</table>
		</div>
	</form>
</div>