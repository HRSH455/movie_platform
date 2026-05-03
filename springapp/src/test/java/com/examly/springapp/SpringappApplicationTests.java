

package com.examly.springapp;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;


import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;


@SpringBootTest
@AutoConfigureMockMvc
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class SpringappApplicationTests {

@Autowired
private MockMvc mockMvc;



   @Test
   @Order(3)
   public void backend_day15_testWelcomeApi() throws Exception {
	mockMvc.perform(MockMvcRequestBuilders.get("/api/test/welcome"))
			.andExpect(MockMvcResultMatchers.status().isOk());
       }

   


	@Test
	@Order(6)
	public void backend_day16_testGetAllMovieList() throws Exception {

		mockMvc.perform(MockMvcRequestBuilders.get("/api/test/movie")
				.accept(MediaType.APPLICATION_JSON))
				.andExpect(MockMvcResultMatchers.status().isOk())
				.andExpect(jsonPath("$").isArray())
				.andReturn();
	}
	
	@Test
	@Order(9)
	public void backend_day17_testAddMovie() throws Exception {
	String movieData = "{\"id\": 201, \"title\": \"Inception\", \"genre\": \"Sci-Fi\", \"duration\": 148}";

		mockMvc.perform(MockMvcRequestBuilders.post("/api/movie")
				.contentType(MediaType.APPLICATION_JSON)
				.content(movieData)
				.accept(MediaType.APPLICATION_JSON))
				.andExpect(MockMvcResultMatchers.status().isOk())
				.andExpect(jsonPath("$.title").value("Inception"))
				.andReturn();
	}


	@Test
    @Order(10)
    void backend_day18_testGetAllMovie() throws Exception {

        mockMvc.perform(MockMvcRequestBuilders.get("/api/movie")
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$[?(@.title == 'Inception')]").exists())
                .andReturn();
    }



	

	//CRUD Booking api



}

