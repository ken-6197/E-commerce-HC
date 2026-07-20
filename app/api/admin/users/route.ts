import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json(
        { error: 'Admin client not configured' },
        { status: 500 }
      );
    }

    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

    // Get all users from auth
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.listUsers();

    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 500 });
    }

    // Create regular client for profiles
    const supabase = createClient(
      supabaseUrl,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
    );

    // Get all profiles
    const { data: profiles, error: profileError } = await supabase
      .from('profiles')
      .select('*');

    if (profileError) {
      console.error('Error fetching profiles:', profileError);
    }

    // Merge auth users with profile data (PRIORITIZE PROFILE DATA)
    const mergedUsers = authData?.users?.map((authUser) => {
      const profile = profiles?.find((p) => p.id === authUser.id);
      
      return {
        id: authUser.id,
        email: authUser.email || '',
        user_metadata: {
          // Prioritize profile data over auth metadata
          full_name: profile?.full_name || authUser.user_metadata?.full_name || '',
          phone: profile?.phone || authUser.user_metadata?.phone || '',
          avatar_url: profile?.avatar_url || authUser.user_metadata?.avatar_url || '',
          role: authUser.user_metadata?.role || 'user',
        },
        created_at: authUser.created_at,
        last_sign_in_at: authUser.last_sign_in_at,
      };
    }) || [];

    return NextResponse.json(mergedUsers);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}