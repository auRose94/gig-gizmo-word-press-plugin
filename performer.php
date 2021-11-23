<?php get_header(); ?>

<main role="main">
	<!-- section -->
	<section>

		<?php if (have_posts()) : while (have_posts()) : the_post(); ?>

				<!-- article -->
				<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

					<!-- post thumbnail -->
					<?php if (has_post_thumbnail()) : // Check if Thumbnail exists 
					?>
						<a href="<?php the_post_thumbnail_url('full'); ?>" title="<?php the_title(); ?>">
							<?php the_post_thumbnail([50, 50], [
								"style"	=>	"width: 50px; height: 50px;",
								"class" => "rounded-circle float-left"
							]); // Fullsize image for the single post 
							?>
						</a>
					<?php endif; ?>
					<!-- /post thumbnail -->

					<!-- post title -->
					<h1>
						<a href="<?php the_permalink(); ?>" title="<?php the_title(); ?>"><?php the_title(); ?></a>
					</h1>
					<!-- /post title -->

					<!-- post details -->
					<span class="date"><?php the_time('F j, Y'); ?> <?php the_time('g:i a'); ?></span>
					<span class="author"><?php _e('Published by', "gig_gizmo"); ?> <?php the_author_posts_link(); ?></span>
					<span class="comments"><?php if (comments_open(get_the_ID())) comments_popup_link(__('Leave your thoughts', "gig_gizmo"), __('1 Comment', "gig_gizmo"), __('% Comments', "gig_gizmo")); ?></span>
					<!-- /post details -->

					<?php the_content(); // Dynamic Content 
					?>

					<?php the_tags(__('Tags: ', "gig_gizmo"), ', ', '<br>'); // Separated by commas with a line break at the end 
					?>

					<!--
			<p><?php _e('Categorised in: ', "gig_gizmo");
				the_category(', '); // Separated by commas 
				?></p>
			<p><?php _e('This post was written by ', "gig_gizmo");
				the_author(); ?></p>
			-->

					<?php edit_post_link(); // Always handy to have Edit Post Links available 
					?>



				</article>
				<!-- /article -->
				<?php comments_template(); ?>

			<?php endwhile; ?>

		<?php else : ?>

			<!-- article -->
			<article>

				<h1><?php _e('Sorry, nothing to display.', "gig_gizmo"); ?></h1>

			</article>
			<!-- /article -->

		<?php endif; ?>

	</section>
	<!-- /section -->
</main>

<?php get_sidebar(); ?>

<?php get_footer(); ?>