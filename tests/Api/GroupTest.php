<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

use App\Models\Group;

class GroupTest extends TestCase
{
    
    use WithFaker;

    public function testGroupCreated()
    {
        $expected = [
            'group_name' => 'group_name',
        ];
        $response = $this->json('POST', '/api/groups', $expected);
        $response
            ->assertStatus(201)
            ->assertJsonFragment($expected);

    }

    public function testGroupRetrieved()
    {
        $group = factory('App\Models\Group')->create();

        $response = $this->json('GET', '/api/groups/' . $group->id);
        $response
            ->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    'group_name',
                ]
            ]);
    }

    public function testAllPeopleRetrieved()
    {
        $group = factory('App\Models\Group', 25)->create();

        $response = $this->json('GET', '/api/groups');
        $response
            ->assertStatus(200)
            ->assertJsonCount(25, 'data');
    }

    public function testNoGroupRetrieved()
    {
        $group = factory('App\Models\Group')->create();
        Group::destroy($group->id);

        $response = $this->json('GET', '/api/groups/' . $group->id);
        $response->assertStatus(404);
    }

    public function testGroupUpdated()
    {
        $group = factory('App\Models\Group')->create();

        $updatedName = $this->faker->jobTitle();
        $response = $this->json('PUT', '/api/groups/' . $group->id, [
            'group_name' => $updatedName
        ]);
        $response->assertStatus(204);

        $updatedGroup = Group::find($group->id);
        $this->assertEquals($updatedName, $updatedGroup->group_name);
    }

    public function testGroupDeleted()
    {
        $group = factory('App\Models\Group')->create();

        $deleteResponse = $this->json('DELETE', '/api/groups/' . $group->id);
        $deleteResponse->assertStatus(204);

        $response = $this->json('GET', '/api/groups/' . $group->id);
        $response->assertStatus(404);

    }
    
}
