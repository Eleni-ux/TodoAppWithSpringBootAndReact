package com.todo.app;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")

public class HomeController {
    @Autowired
    private TodoRepository todoRepository;

    @GetMapping("/todos")
    public List<Todo> getTodos() {
        return this.todoRepository.findAll();
    }

    @PostMapping("/todos")
    ResponseEntity<Todo> createTask(@RequestBody Todo task) throws URISyntaxException {
        Todo result = todoRepository.save(task);
        return ResponseEntity.ok().body(result);

    }

    @DeleteMapping("/todos/{id}")
    void deleteEmployee(@PathVariable Long id) {
        todoRepository.deleteById(id);
    }

    @PutMapping("/todos/{id}")
    Todo replaceEmployee(@RequestBody Todo newTask, @PathVariable Long id) {

        return todoRepository.findById(id).map(new_task -> {
            new_task.setTask(newTask.getTask());
            new_task.setDescription(newTask.getDescription());
            return todoRepository.save(new_task);
        }).orElseGet(() -> {
            newTask.setId(id);
            return todoRepository.save(newTask);
        });
    }

}