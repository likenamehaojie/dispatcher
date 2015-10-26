package com.ldtec.stpm.workflow.data;

public class TodoData {
    public TodoData() {
    }

    public boolean isHaveCondition() {
        return haveCondition;
    }

    public String getName() {
        return name;
    }

    public String getTodoSql() {
        return todoSql;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public void setTodoSql(String todoSql) {
        this.todoSql = todoSql;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setHaveCondition(boolean haveCondition) {
        this.haveCondition = haveCondition;
    }

    private String name="";
    private String value="";
    private String todoSql="";
    private boolean haveCondition=false;
}
