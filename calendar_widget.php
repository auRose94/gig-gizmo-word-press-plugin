<?php

class CalendarWidget extends WP_Widget {
	function __construct() {
		$widget_ops = array(
			"classname"	=> __("CalendarWidget"),
			"description" => __("Customized view of the upcoming shows"),
		);
		parent::__construct("shows-calendar", __("Shows Calendar"), $widget_ops);
		$this->alt_option_name = "CalendarWidget";

		add_action( 'save_post', array($this, 'flush_widget_cache') );
		add_action( 'deleted_post', array($this, 'flush_widget_cache') );
		add_action( 'switch_theme', array($this, 'flush_widget_cache') );
	}

	function flush_widget_cache() {
		wp_cache_delete('CalendarWidget', 'widget');
	}

	function render_list() {
		$data = get_show_table();
		?>
			<div class="calendar-list">
				<?php
					for ($i = 0; $i < count($data); ++$i) {
						$odd = $i % 2 != 0;
						$item = $data[$i];
						$performers = $item["performers"];
						$starTime = new DateTime($item["startTime"]);
						$stopTime = new DateTime($item["stopTime"]);
						?>
							<div class="calendar-list-item <?php echo $odd ? "dark" : ""; ?>" id="item-<?php echo $i; ?>">
								<h1 class="calendar-list-item-title">
									<?php 
										for($ip = 0; $ip < count($performers); ++$ip) {
											$performer = get_post($performers[$ip]);
											?>
												<a href="<?php echo get_post_permalink($performer); ?>"><?php echo $performer->post_title; ?></a><?php 
												if(count($performers) - 1 > $ip) {
													echo ",";
												}?><?php
										}
									?>
								</h1>
								<span class="calendar-list-buffer" ></span>
								<em class="calendar-list-item-time">
									<?php 
										$diff = $starTime->diff($stopTime);
										if ($diff->format('%a') === '0') {
											echo $starTime->format("l F jS g:ia") . "-" . $stopTime->format("g:ia");
										} else {
											echo $starTime->format("l F jS g:ia") . "-" . $stopTime->format("l F jS g:ia");
										}
									?>
								</em>
							</div>
						<?php
					}
				?>
			</div>
		<?php
	}

	function render_table() {
		$data = get_show_table();
		?>
			<div class="calendar-table">
				<table class="table">
					<thead>
						<tr>
							<th scope="col"><?php echo __("Time"); ?></th>
							<th scope="col"><?php echo __("Performers"); ?></th>
						</tr>
					</thead>
					<tbody>
						<?php
							for ($i = 0; $i < count($data); ++$i) {
								$odd = $i % 2 != 0;
								$item = $data[$i];
								$performers = $item["performers"];
								$starTime = new DateTime($item["startTime"]);
								$stopTime = new DateTime($item["stopTime"]);
								?>
									<tr class="<?php echo $odd ? "dark" : ""; ?>" id="item-<?php echo $i; ?>">
										<td>
											<?php 
												$diff = $starTime->diff($stopTime);
												if ($diff->format('%a') === '0') {
													echo $starTime->format("l F jS g:ia") . "-" . $stopTime->format("g:ia");
												} else {
													echo $starTime->format("l F jS g:ia") . "-" . $stopTime->format("l F jS g:ia");
												}
											?>
										</td>
										<td>
											<?php 
												for($ip = 0; $ip < count($performers); ++$ip) {
													$performer = get_post($performers[$ip]);
													?>
														<a href="<?php echo get_post_permalink($performer); ?>"><?php echo $performer->post_title; ?></a><?php 
														if(count($performers) - 1 > $ip) {
															echo ",";
														}?><?php
												}
											?>
										</td>
									</tr>
								<?php
							}
						?>
					</tbody>
				</table>
			</div>
		<?php
	}

	function widget($args, $instance) {
		$cache = wp_cache_get("CalendarWidget", "widget");

		if(!is_array($cache))
			$cache = array();

		if(!isset($args['widget_id']))
			$args['widget_id'] = $this->id;

		if(isset($cache[$args['widget_id']])) {
			echo $cache[ $args['widget_id'] ];
			return;
		}

		ob_start();
		extract($args);

		$title = (!empty($instance['title'])) ?
			$instance['title'] : __('Upcoming shows');
		$title = apply_filters( 'widget_title', $title, $instance, $this->id_base );
		
		$type = (!empty($instance["type"])) ?
			$instance["type"] : "list";

		echo $before_widget;
		?>
			<h1><?php if ( $title ) echo $title; ?></h1>
		<?php

		switch($type) {
			case "list":
				$this->render_list();
			break;
			case "table":
				$this->render_table();
			break;
			break;
		}

		echo $after_widget;

		// Reset the global $the_post as this query will have stomped on it
		wp_reset_postdata();

		$cache[$args['widget_id']] = ob_get_flush();
		wp_cache_set('CalendarWidget', $cache, 'widget');
	}

	function form( $instance ) {
		$title		 = isset( $instance['title'] ) ? esc_attr( $instance['title'] ) : '';
		$type = isset($instance["type"]) ? esc_attr($instance["type"]) : "list";
?>
		<p>
			<label for="<?php echo $this->get_field_id( 'title' ); ?>"><?php _e( 'Title:' ); ?></label>
			<input class="widefat" id="<?php echo $this->get_field_id( 'title' ); ?>" name="<?php echo $this->get_field_name( 'title' ); ?>" type="text" value="<?php echo $title; ?>" />
		</p>
		<p>
			<label for="<?php echo $this->get_field_id( 'type' ); ?>"><?php _e( 'Type:' ); ?></label>
			<select class="widefat" id="<?php echo $this->get_field_id( 'type' ); ?>" name="<?php echo $this->get_field_name( 'type' ); ?>" value="<?php echo $type; ?>" >
				<option value="list">List</option>
				<option value="table">Table</option>
			</select>
		</p>
<?php
	}
		
	function update( $new_instance, $old_instance ) {
		$instance = $old_instance;
		$instance['title'] = strip_tags($new_instance['title']);
		$instance['type']	= strip_tags($new_instance["type"]);
		$this->flush_widget_cache();

		$alloptions = wp_cache_get( 'alloptions', 'options' );
		if ( isset($alloptions['CalendarWidget']) )
				delete_option('CalendarWidget');

		return $instance;
	}
};
